import React, { useState, useEffect } from 'react';
import L from 'leaflet';
import { MapContainer, TileLayer, Marker, Polyline } from 'react-leaflet';
import { getGroundTracks, getLatLngObj } from 'tle.js';
import { state, tle } from '../../types/satellite';
import 'leaflet/dist/leaflet.css';
import icon from '../../assets/icons/point.svg';
import { degreesLat, degreesLong, eciToGeodetic, gstime, propagate, twoline2satrec } from 'satellite.js';
import { Callout } from '../../components/Callout';

export const OrbitMap: React.FC<{ tle: tle }> = ({ tle }) => {
    const marker = new L.Icon({
        iconUrl: icon,
        popupAnchor: [0, 0],
        iconRetinaUrl: icon,
        iconSize: [15, 15],
    });

    const [markerPosition, setMarkerPosition] = useState<L.LatLngTuple>([0, 0]);
    const [groundTrack, setGroundTrack] = useState<any>();
    const [satState, setSatState] = useState<state>();

    // Create satellite ground track
    useEffect(() => {
        const createGroundTrack = async () => {
            const track = await getGroundTracks({
                tle: `${tle.tle_line0}\n${tle.tle_line1}\n${tle.tle_line2}`,
                stepMS: 10000,
                isLngLatFormat: false,
            });

            setGroundTrack(track)
        }

        createGroundTrack();
    }, [tle]);

    // Set the satellite marker position
    useEffect(() => {
        const satrec = twoline2satrec(tle.tle_line1, tle.tle_line2);
        let positionVelocity, gmst, positionGd: any;

        const interval = setInterval(() => {
            const latLng = getLatLngObj(`${tle.tle_line0}\n${tle.tle_line1}\n${tle.tle_line2}`);
            setMarkerPosition([
                latLng.lat, latLng.lng
            ]);

            positionVelocity = propagate(satrec, new Date());
            gmst = gstime(new Date());

            if (typeof positionVelocity.position !== 'boolean' && typeof positionVelocity.velocity !== 'boolean') {
                positionGd = eciToGeodetic(positionVelocity.position, gmst);

                setSatState({
                    velocity: Math.sqrt(positionVelocity.velocity.x ** 2 + positionVelocity.velocity.y ** 2 + positionVelocity.velocity.z ** 2),
                    longitude: degreesLong(positionGd.longitude),
                    latitude: degreesLat(positionGd.latitude),
                    height: positionGd.height,
                });
            }
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div style={{ height: 'calc(480px)' }}>
            <div className="absolute top-0 right-0 left-300 w-full" style={{ height: '500px' }}>
                {markerPosition[0] !== 0 &&
                    <MapContainer
                        center={markerPosition}
                        zoom={3}
                        scrollWheelZoom={true}
                        style={{ height: '500px', backgroundColor: '#262626', position: 'inherit' }}
                        maxZoom={10}
                        minZoom={2}
                        zoomControl={false}
                        attributionControl={false}
                    >
                        <TileLayer
                            url="https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png"
                        />
                        <Marker position={markerPosition} icon={marker} />
                        {groundTrack &&
                            <Polyline positions={groundTrack} pathOptions={{ color: 'gray' }} weight={1.25}/>
                        }
                    </MapContainer>
                }
                {satState &&
                    <div className="absolute flex bottom-3 right-3 font-light" style={{ zIndex: 1000 }}>
                        <Callout
                            title="Latitude"
                            content={satState.latitude.toFixed(2)}
                            units="°"
                            styles="mr-3 min-w-90"
                        />
                        <Callout
                            title="Longitude"
                            content={satState.longitude.toFixed(2)}
                            units="°"
                            styles="mr-3 min-w-90"
                        />
                        <Callout
                            title="Altitude"
                            content={satState.height.toFixed(2)}
                            units="km"
                            styles="mr-3 min-w-90"
                        />
                        <Callout
                            title="Velocity"
                            content={satState.velocity.toFixed(2)}
                            units="km/s"
                            styles="min-w-90"
                        />
                    </div>
                }
            </div>
        </div>
    )
}

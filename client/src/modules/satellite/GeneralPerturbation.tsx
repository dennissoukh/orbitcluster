import React, { useEffect, useState } from 'react';
import { twoline2satrec } from 'satellite.js';
import { convertToDate } from '../../lib/julian';
import { determineOrbitType } from '../../lib/orbit';
import { orbit } from '../../types/orbit';
import { tle } from '../../types/satellite';
import { Callout } from '../../components/Callout';
import { timestampToReadableDateTime } from '../../lib/date';

interface GeneralPerturbationProps {
    tle: tle
}

export const GeneralPerturbation: React.FC<GeneralPerturbationProps> = ({ tle }) => {
    const [orbit, setOrbit] = useState<orbit>();

    useEffect(() => {
        const sat = twoline2satrec(tle.tle_line1, tle.tle_line2);

        // period = 2π / mean motion
        const period = (2 * Math.PI) / sat.no;

        // Convert inclination to degrees
        const inclination = sat.inclo * (180 / Math.PI);

        // Semi major axis: (standard gravitational parameter in km)^1/3 / ((radians per minute to radians per second) * mean motion)^2/3
        const semiMajorAxis = (Math.pow(3.986004418e5, 1/3) / Math.pow((0.016666664258112 * sat.no), 2/3));

        const eccentricity = sat.ecco;

        // apoapsis = semi major axis * (1 + eccentricity) - earth radius
        const apoapsis = semiMajorAxis * (1 + eccentricity) - 6378.137;

        // periapsis = semi major axis * (1 - eccentricity) - earth radius
        const periapsis = semiMajorAxis * (1 - eccentricity) - 6378.137;

        const calculatedOrbit = {
            apoapsis,
            periapsis,
            period,
            inclination,
            eccentricity,
            semimajor_axis: semiMajorAxis,
            epoch: convertToDate(sat.jdsatepoch),
        }

        setOrbit({ ...calculatedOrbit, type: determineOrbitType(calculatedOrbit) });
    }, [tle]);

    return (
        <div className="mt-4">
            {orbit && orbit.type &&
                <Callout title="Orbit Type" content={orbit.type}/>
            }
            {orbit &&
                <>
                    <div className="flex flex-wrap overflow-hidden mt-4">
                        <div className="w-1/2">
                            <Callout
                                title="Apoapsis"
                                content={orbit.apoapsis.toFixed(2)}
                                units="km"
                            />
                        </div>
                        <div className="w-1/2">
                            <Callout
                                title="Periapsis"
                                content={orbit.periapsis.toFixed(2)}
                                units="km"
                            />
                        </div>
                    </div>
                    <div className="flex flex-wrap overflow-hidden mt-4">
                        <div className="w-1/2">
                            <Callout
                                title="Period"
                                content={orbit.period.toFixed(2)}
                                units="mins"
                            />
                        </div>
                        <div className="w-1/2">
                            <Callout
                                title="Semi Major Axis"
                                content={orbit.semimajor_axis.toFixed(2)}
                                units="km"
                            />
                        </div>
                    </div>
                    <div className="flex flex-wrap overflow-hidden mt-4">
                        <div className="w-1/2">
                            <Callout
                                title="Inclination"
                                content={orbit.inclination.toFixed(2)}
                                units="mins"
                            />
                        </div>
                        <div className="w-1/2">
                            <Callout
                                title="Epoch"
                                content={timestampToReadableDateTime(orbit.epoch)}
                                units="z"
                            />
                        </div>
                    </div>
                </>
            }
        </div>
    )
}

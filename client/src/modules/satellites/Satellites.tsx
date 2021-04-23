import React, { useState, useEffect } from 'react';
import SatelliteListItem from './SatelliteListItem';

export const Satellites: React.FC = () => {
    const [satellites, setSatellites] = useState([]);

    const getSatellites = async (): Promise<any> => {
        fetch(`http://localhost:4000/v1/satellites?page=0&initial=true`)
            .then(res => res.json())
            .then(res => {
                setSatellites(res.data);
            })
    }

    useEffect(() => {
        getSatellites();
    }, [])

    return (
        <div>
            <div className="flex items-center bg-secondary text-sm border-gray border-solid border p-3 px-5 rounded-lg">
                <div className="w-1/6">
                    <p>Satname</p>
                </div>
                <div className="w-1/6">
                    <p>NORAD ID</p>
                    <p>Designator</p>
                </div>
                <div className="w-1/6">
                    <div>
                        Orbit Status
                    </div>
                </div>
                <div className="w-1/6">
                    <p>Object Type</p>
                </div>
                <div className="w-1/5">
                    <p>Launch Site</p>
                    <p>Launch Date</p>
                </div>
                <div className="w-1/6">
                    <p>Operator</p>
                </div>
                <div className="w-1/12">

                </div>
            </div>
            <div className="px-5">
                {satellites.map((item: any, index: number) => {
                    return (
                        <SatelliteListItem satellite={item} index={index}/>
                    )
                })}
            </div>
        </div>
    )
}

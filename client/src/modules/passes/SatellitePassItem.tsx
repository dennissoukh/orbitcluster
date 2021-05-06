import React from 'react';
import { useEffect } from 'react';
import { timestampToReadableDayMonth, timestampToReadableTime } from '../../lib/date';
import { convertToDate } from '../../lib/julian';

interface SatellitePassItemProps {
    pass: any,
}

export const SatellitePassItem: React.FC<SatellitePassItemProps> = ({ pass }) => {
    useEffect(() => { console.log(pass) }, [pass])
    return (
        <div className="flex text-sm mt-6">
            <div className="w-9 mx-5">
                <span>{timestampToReadableDayMonth(convertToDate(pass.visible_aos))}</span>
            </div>
            <div className="w-9 mx-5">
                {pass.max_apparent_magnitude &&
                    <span>{pass.max_apparent_magnitude.toFixed(1)}</span>
                }
            </div>
            <div className="w-5l mx-5">
                <div className="flex justify-between">
                    <div>
                        {timestampToReadableTime(convertToDate(pass.visible_aos))}
                    </div>
                    <div>
                        {pass.visible_aos_el.toFixed()}°
                    </div>
                    <div>
                        {pass.visible_aos_az.toFixed()}°
                    </div>
                </div>
            </div>
            <div className="mx-5 w-5l">
                <div className="flex justify-between">
                    <div>
                        {timestampToReadableTime(convertToDate(pass.visible_tca))}
                    </div>
                    <div>
                        {pass.visible_max_el.toFixed()}°
                    </div>
                    <div>
                        {pass.visible_max_el_az.toFixed()}°
                    </div>
                </div>
            </div>
            <div className="w-5l mx-5">
                <div className="flex justify-between">
                    <div>
                        {timestampToReadableTime(convertToDate(pass.visible_los))}
                    </div>
                    <div>
                        {pass.visible_los_el.toFixed()}°
                    </div>
                    <div>
                        {pass.visible_los_az.toFixed()}°
                    </div>
                </div>
            </div>
            <div className="w-9 mx-5">
                <span>Visible {pass.vis}</span>
            </div>
        </div>
    )
}

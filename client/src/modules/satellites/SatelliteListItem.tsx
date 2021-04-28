import React from 'react';
import { Link } from 'react-router-dom';
import { timestampToReadableDate } from '../../lib/date';
import { satellite } from '../../types/satellite';
import { VscDebugStepOver } from 'react-icons/vsc';

interface SatelliteListItemProps {
    satellite: satellite,
    index: number,
}

export const SatelliteListItem: React.FC<SatelliteListItemProps> = ({
    satellite,
    index,
}) => {
    return (
        <div className="flex items-center mt-6 text-sm">
            <div className="w-1/6">
                <Link to={`/satellites/${satellite._id}`}>
                    <p>{satellite.satname}</p>
                </Link>
            </div>
            <div className="w-1/6">
                <p>{satellite.norad_cat_id}</p>
                <p>{satellite.object_id}</p>
            </div>
            <div className="w-1/6">
                <div className={!satellite.decay
                    ? 'h-1.5 w-1.5 bg-green rounded-full'
                    : 'h-1.5 w-1.5 bg-gray rounded-full'
                }></div>
            </div>
            <div className="w-1/6">
                <p>{satellite.object_type}</p>
            </div>
            <div className="w-1/5">
                <Link to={`/launch-site/${satellite.site}`} className="w-fit">
                    <p>{satellite.site}</p>
                </Link>
                <p>{timestampToReadableDate(satellite.launch)}</p>
            </div>
            <div className="w-1/6">
                <Link to={`/operator/${satellite.country}`}>
                    <p>{satellite.country}</p>
                </Link>
            </div>
            <div className="w-1/12 flex justify-end">
                {satellite.decay === '1970-01-01T00:00:00.000Z' &&
                    <>
                        <div className="w-max border border-solid border-gray rounded-lg p-2">
                            <Link to={`/passes/${satellite._id}}`}>
                                <VscDebugStepOver size="13"/>
                            </Link>
                        </div>
                    </>
                }
            </div>
        </div>
    )
}

export default SatelliteListItem;

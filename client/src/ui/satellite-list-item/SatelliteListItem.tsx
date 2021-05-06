import React from 'react';
import { Link } from 'react-router-dom';
import { timestampToReadableDate } from '../../lib/date';
import { satellite } from '../../types/satellite';
import { VscDebugStepOver, VscGlobe } from 'react-icons/vsc';

interface SatelliteListItemProps {
    satellite: satellite,
}

export const SatelliteListItem: React.FC<SatelliteListItemProps> = ({
    satellite,
}) => {
    return (
        <div className="flex items-center mt-6 text-sm">
            <div className="w-1/6 w-md-full flex items-center">
                <div className={!satellite.decay
                    ? 'h-1.5 w-1.5 bg-green rounded-full mr-2'
                    : 'h-1.5 w-1.5 bg-primary-600 rounded-full mr-2'
                }></div>
                <Link to={`/satellites/${satellite._id}`}>
                    <p>{satellite.satname}</p>
                </Link>
            </div>
            <div className="w-1/6">
                <p>{satellite.norad_cat_id}</p>
                <p>{satellite.object_id}</p>
            </div>
            <div className="w-1/6">
                <p>{satellite.object_type}</p>
            </div>
            <div className="w-1/5">
                <Link to={`/launch-sites/${satellite.site}`} className="w-fit">
                    <p>{satellite.site}</p>
                </Link>
                <p>{timestampToReadableDate(satellite.launch)}</p>
            </div>
            <div className="w-1/6">
                <Link to={`/operators/${satellite.country}`}>
                    <p>{satellite.country}</p>
                </Link>
            </div>
            <div className="flex flex-1 justify-end">
                {!satellite.decay &&
                    <>
                        <div className="w-max border border-solid border-primary-600 rounded-lg p-2 mr-2">
                            <Link to={`/passes/${satellite.norad_cat_id}`}>
                                <VscDebugStepOver size="13"/>
                            </Link>
                        </div>
                        <div className="w-max border border-solid border-primary-600 rounded-lg p-2">
                            <Link to={`/viz/3d?sat=${satellite._id}`}>
                                <VscGlobe size="13"/>
                            </Link>
                        </div>
                    </>
                }
            </div>
        </div>
    )
}

export default SatelliteListItem;

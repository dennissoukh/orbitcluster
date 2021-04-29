import React from 'react';
import { Link } from 'react-router-dom';
import { operator } from '../../types/operator';

interface SatelliteListItemProps {
    operator: operator,
}

export const SatelliteListItem: React.FC<SatelliteListItemProps> = ({
    operator,
}) => {
    return (
        <div className="flex items-center mt-6 text-sm">
            <div className="w-1/4 pr-3">
                <Link to={`/operators/${operator.spadoc_cd}`}>
                    <p className="uppercase">{operator.country}</p>
                </Link>
            </div>
            <div className="w-1/6">
                {operator.spadoc_cd}
            </div>
            <div className="w-1/6">
                {operator.country_total}
            </div>
            <div className="w-1/6">
                {operator.orbital_payload_count}
            </div>
            <div className="w-1/6">
                {operator.orbital_debris_count}
            </div>
            <div className="w-1/6">
                {operator.orbital_rocket_body_count}
            </div>
        </div>
    )
}

export default SatelliteListItem;

import React from 'react';

export const SatelliteListItemTitler: React.FC = () => {
    return (
        <div className="flex items-center bg-primary-800 text-primary-200 text-sm py-3 px-3 rounded-lg">
            <div className="w-1/6">
                <p>Name</p>
            </div>
            <div className="w-1/6">
                <p>NORAD ID</p>
                <p>Designator</p>
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
            <div className="flex-1 text-right">
                <p>Actions</p>
            </div>
        </div>
    )
}

export default SatelliteListItemTitler;

import React, { useState, useEffect } from 'react';
import { usePaginationQuery } from '../../hooks/usePaginationQuery';
import PaginationNavigator from '../../ui/pagination/Navigator';
import SatelliteListItem from '../../ui/satellite-list-item/SatelliteListItem';
import { useStore } from '../../global-stores/useSatellitesPageStore';

export const Satellites: React.FC = () => {
    const [data, setData] = useState([]);

    const metadata      = useStore(state => state.metadata);
    const setMetadata   = useStore((state: any) => state.setMetadata);

    const {
        response,
        isLoading,
        navigatePage,
    } = usePaginationQuery('satellites', metadata);

    useEffect(() => {
        if (response && !isLoading) {
            setData(response.data);
            setMetadata(response.metadata);
        }
    });

    return (
        <div className="px-4 md:px-7 mt-5">
            <h4>Satellite Catalogue</h4>
            <div className="mt-5">
                <div className="flex items-center bg-primary-800 text-primary-200 text-sm py-3 px-5 rounded-lg">
                    <div className="w-1/6 ml-3">
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
                    {/* <div className="w-1/12">
                        <div>
                            Orbit Status
                        </div>
                    </div> */}
                    <div className="w-1/12">
                        <p>Actions</p>
                    </div>
                </div>
                <div className="px-5">
                    {data && data.map((item: any, index: number) => {
                        return (
                            <SatelliteListItem satellite={item} key={index}/>
                        )
                    })}
                </div>
                {metadata &&
                    <div className="pt-6 pb-4 px-5">
                        <PaginationNavigator pagination={metadata} callback={navigatePage}/>
                    </div>
                }
            </div>
        </div>
    )
}

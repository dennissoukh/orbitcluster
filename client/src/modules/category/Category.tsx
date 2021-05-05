import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { usePaginationQuery } from '../../hooks/usePaginationQuery';
import PaginationNavigator from '../../ui/pagination/Navigator';
import SatelliteListItem from './SatelliteListItem';
import { useCategoryPageStore } from '../../global-stores/useCategoryPageStore';

export const Category: React.FC = () => {
    const { id } = useParams<{ id: string }>();

    const [data, setData] = useState([]);

    const metadata      = useCategoryPageStore(state => state.metadata);
    const setMetadata   = useCategoryPageStore((state: any) => state.setMetadata);

    const {
        response,
        isLoading,
        navigatePage,
    } = usePaginationQuery(`categories/${id}`, metadata);

    useEffect(() => {
        if (response && !isLoading) {
            setData(response.data);
            setMetadata(response.metadata);
        }
    });

    return (
        <div className="px-4 md:px-7">
            <div className="mt-5">
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

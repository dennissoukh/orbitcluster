import React, { useEffect, useState } from 'react';
import { usePaginationQuery } from '../../hooks/usePaginationQuery';
import PaginationNavigator from '../../ui/pagination/Navigator';
import SatelliteListItem from '../operator/SatelliteListItem';
import { TextSearch } from '../../components/TextSearch';

export const Launched: React.FC = () => {
    const [data, setData] = useState([]);
    const [metadata, setMetadata] = useState<any>({});
    const {
        response,
        isLoading,
        navigatePage,
        setSearch,
    } = usePaginationQuery('recent/new');

    useEffect(() => {
        if (response && !isLoading) {
            setData(response.data);
            setMetadata(response.metadata);
        }
    }, [response]);

    return (
        <div className="px-4 md:px-7">
            <div className="flex items-center justify-between flex-wrap">
                <TextSearch callback={setSearch}/>
            </div>
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
                            <SatelliteListItem satellite={item} index={index} key={index}/>
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

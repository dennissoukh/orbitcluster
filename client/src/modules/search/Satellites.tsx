import React, { useState, useEffect } from 'react';
import { usePaginationQuery } from '../../hooks/usePaginationQuery';
import PaginationNavigator from '../../ui/pagination/Navigator';
import SatelliteListItemTitler from '../../ui/satellite-list-item/SatelliteListItemTitler';
import SatelliteListItem from '../../ui/satellite-list-item/SatelliteListItem';
import { TextSearch } from '../../components/TextSearch';

export const SatelliteSearch: React.FC = () => {
    const [data, setData] = useState([]);
    const [metadata, setMetadata] = useState<any>({});
    const [search, setSearch] = useState<any>('');
    const {
        response,
        isLoading,
        navigatePage,
        // setSearch,
    } = usePaginationQuery('satellites', metadata, search);

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
                <SatelliteListItemTitler/>
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

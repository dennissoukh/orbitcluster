import React, { useEffect, useState } from 'react';
import { usePaginationQuery } from '../../hooks/usePaginationQuery';
import PaginationNavigator from '../../ui/pagination/Navigator';
import SatelliteListItem from '../../ui/satellite-list-item/SatelliteListItem';
import { useDecayedPageStore } from '../../global-stores/useDecayedPageStore';
import SatelliteListItemTitler from '../../ui/satellite-list-item/SatelliteListItemTitler';

export const Decayed: React.FC = () => {
    const [data, setData] = useState([]);

    const metadata      = useDecayedPageStore(state => state.metadata);
    const setMetadata   = useDecayedPageStore((state: any) => state.setMetadata);

    const {
        response,
        isLoading,
        navigatePage,
    } = usePaginationQuery('recent/decayed', metadata);

    useEffect(() => {
        if (response && !isLoading) {
            setData(response.data);
            setMetadata(response.metadata);
        }
    });

    return (
        <div className="px-4 md:px-6">
            <h4>Recently Decayed</h4>
            <div className="mt-5">
                <SatelliteListItemTitler/>
                <div className="px-3">
                    {data && data.map((item: any, index: number) => {
                        return (
                            <SatelliteListItem satellite={item} key={index}/>
                        )
                    })}
                </div>
                {metadata &&
                    <div className="pt-6 pb-4 px-3">
                        <PaginationNavigator pagination={metadata} callback={navigatePage}/>
                    </div>
                }
            </div>
        </div>
    )
}

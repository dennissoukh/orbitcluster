import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { usePaginationQuery } from '../../hooks/usePaginationQuery';
import PaginationNavigator from '../../ui/pagination/Navigator';
import SatelliteListItem from '../../ui/satellite-list-item/SatelliteListItem';
import { satellite } from '../../types/satellite';
import { useLaunchSitePageStore } from '../../global-stores/useLaunchSitePageStore';
import SatelliteListItemTitler from '../../ui/satellite-list-item/SatelliteListItemTitler';

export const LaunchSite: React.FC = () => {
    const { id } = useParams<{ id: string }>();

    const [data, setData] = useState<Array<satellite>>([]);

    const metadata      = useLaunchSitePageStore(state => state.metadata);
    const setMetadata   = useLaunchSitePageStore((state: any) => state.setMetadata);

    const {
        response,
        isLoading,
        navigatePage,
    } = usePaginationQuery(`launch-sites/${id}`, metadata);

    useEffect(() => {
        if (response && !isLoading) {
            setData(response.data);
            setMetadata(response.metadata);
        }
    });

    return (
        <div className="px-4 md:px-6">
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

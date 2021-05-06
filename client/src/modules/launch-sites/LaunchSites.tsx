import React, { useEffect, useState } from 'react';
import { useLaunchSitesPageStore } from '../../global-stores/useLaunchSitesPageStore';
import { usePaginationQuery } from '../../hooks/usePaginationQuery';
import { launchSite } from '../../types/other';
import PaginationNavigator from '../../ui/pagination/Navigator';
import { LaunchSitesListItem } from './LaunchSitesListItem';

export const LaunchSites: React.FC = () => {
    const [data, setData] = useState<Array<launchSite>>([]);

    const metadata      = useLaunchSitesPageStore(state => state.metadata);
    const setMetadata   = useLaunchSitesPageStore((state: any) => state.setMetadata);

    const {
        response,
        isLoading,
        navigatePage,
    } = usePaginationQuery('launch-sites', metadata);

    useEffect(() => {
        if (response && !isLoading) {
            setData(response.data);
            setMetadata(response.metadata);
        }
    });

    return (
        <div className="px-4 md:px-7 py-5">
            <div className="flex flex-wrap justify-between mx-3">
                {data && data.map((item: launchSite, index: number) => {
                    return (
                        <LaunchSitesListItem site={item} key={index}/>
                    )
                })}
            </div>
            {metadata &&
                <div className="pt-6 pb-4 px-3">
                    <PaginationNavigator pagination={metadata} callback={navigatePage}/>
                </div>
            }
        </div>
    )
}

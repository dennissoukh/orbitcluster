import React, { useEffect, useState } from 'react';
import { usePaginationQuery } from '../../hooks/usePaginationQuery';
import { launchSite } from '../../types/other';
import PaginationNavigator from '../../ui/pagination/Navigator';
import { LaunchSitesListItem } from './LaunchSitesListItem';

export const LaunchSites: React.FC = () => {
    const [data, setData] = useState<Array<launchSite>>([]);
    const [metadata, setMetadata] = useState<any>({});
    const {
        response,
        isLoading,
        navigatePage,
        setSearch,
    } = usePaginationQuery('launch-sites');

    useEffect(() => {
        if (response && !isLoading) {
            setData(response.data);
            setMetadata(response.metadata);
        }
    }, [response]);

    return (
        <div className="px-4 md:px-7 py-5">
            <div className="flex flex-wrap justify-between mx-5">
                {data && data.map((item: launchSite, index: number) => {
                    return (
                        <LaunchSitesListItem site={item} key={index}/>
                    )
                })}
            </div>
            {metadata &&
                <div className="pt-6 pb-4 px-5">
                    <PaginationNavigator pagination={metadata} callback={navigatePage}/>
                </div>
            }
        </div>
    )
}

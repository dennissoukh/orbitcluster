import React from 'react';
import { Link } from 'react-router-dom';
import { launchSite } from '../../types/other';

interface LaunchSitesListItemProps {
    site: launchSite,
}

export const LaunchSitesListItem: React.FC<LaunchSitesListItemProps> = ({ site }) => {
    return (
        <div className="border border-solid border-secondary p-4 rounded-lg my-5 w-400">
            <div>
                <div style={{ height: '200px' }} className="flex items-center justify-center">
                    <div style={{
                        backgroundImage: `url(http://localhost:4000/public/maps/${site.site_code}.svg)`,
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'contain',
                        backgroundPosition: 'center',
                        height: '65%'
                    }} className="w-full h-full">

                    </div>
                </div>
                <p className="uppercase text-sm mt-3">
                    <Link to={`/launch-sites/${site.site_code}`}>{site.launch_site}</Link>
                </p>
            </div>
        </div>
    )
}

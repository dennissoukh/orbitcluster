import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { usePaginationQuery } from '../../hooks/usePaginationQuery';
import PaginationNavigator from '../../ui/pagination/Navigator';
import SatelliteListItem from '../../ui/satellite-list-item/SatelliteListItem';
import { satellite } from '../../types/satellite';
import { useOperatorPageStore } from '../../global-stores/useOperatorPageStore';
import SatelliteListItemTitler from '../../ui/satellite-list-item/SatelliteListItemTitler';

export const Operator: React.FC = () => {
    const { id } = useParams<{ id: string }>();

    const [data, setData] = useState<Array<satellite>>([]);

    const metadata      = useOperatorPageStore(state => state.metadata);
    const setMetadata   = useOperatorPageStore((state: any) => state.setMetadata);

    const {
        response,
        isLoading,
        navigatePage,
    } = usePaginationQuery(`operators/${id}`, metadata);

    useEffect(() => {
        if (response && !isLoading) {
            setData(response.data);
            setMetadata(response.metadata);
        }
    });

    return (
        <div className="px-4 md:px-6">
            <h4>Operator Satellites</h4>
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

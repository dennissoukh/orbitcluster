import React, { useEffect, useState } from 'react';
import { usePaginationQuery } from '../../hooks/usePaginationQuery';
import PaginationNavigator from '../../ui/pagination/Navigator';
import OperatorListItem from './OperatorListItem';
import { useOperatorsPageStore } from '../../global-stores/useOperatorsPageStore';

export const Operators: React.FC = () => {
    const [data, setData] = useState([]);

    const metadata      = useOperatorsPageStore(state => state.metadata);
    const setMetadata   = useOperatorsPageStore((state: any) => state.setMetadata);

    const {
        response,
        isLoading,
        navigatePage,
    } = usePaginationQuery('operators', metadata);

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
                    <div className="w-1/4 pr-3">
                        <p>Operator</p>
                    </div>
                    <div className="w-1/6">
                        <p>ID</p>
                    </div>
                    <div className="w-1/6">
                        <p>Operator Total</p>
                    </div>
                    <div className="w-1/6">
                        <p>Orbital Payload Count</p>
                    </div>
                    <div className="w-1/6">
                        <p>Orbital Debris Count</p>
                    </div>
                    <div className="w-1/6">
                        <p>Orbital Rocket Body Count</p>
                    </div>
                </div>
                <div className="px-5">
                    {data && data.map((item: any, index: number) => {
                        return (
                            <OperatorListItem operator={item} key={index}/>
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

import React, { useEffect, useState } from 'react';
import { useCategoriesPageStore } from '../../global-stores/useCategoriesPageStore';
import { usePaginationQuery } from '../../hooks/usePaginationQuery';
import PaginationNavigator from '../../ui/pagination/Navigator';
import CategoriesListItem from './CategoriesListItem';

export const Categories: React.FC = () => {
    const [data, setData] = useState([]);

    const metadata      = useCategoriesPageStore(state => state.metadata);
    const setMetadata   = useCategoriesPageStore((state: any) => state.setMetadata);

    const {
        response,
        isLoading,
        navigatePage,
    } = usePaginationQuery('categories', metadata);

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
                    <div className="w-1/3 pr-3">
                        <p>Category</p>
                    </div>
                    <div className="w-1/6">
                        <p>Satellite Count</p>
                    </div>
                </div>
                <div className="px-5">
                    {data && data.map((item: any, index: number) => {
                        return (
                            <CategoriesListItem category={item} key={index}/>
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

import React, { useEffect, useState } from 'react';
import { useCategoriesPageStore } from '../../global-stores/useCategoriesPageStore';
import { usePaginationQuery } from '../../hooks/usePaginationQuery';
import PaginationNavigator from '../../ui/pagination/Navigator';
import CategoriesListItem from './CategoriesListItem';

export const Categories: React.FC = () => {
    const [data, setData] = useState([]);

    const {
        response,
        isLoading,
        navigatePage,
    } = usePaginationQuery('categories');

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch('http://localhost:4000/v1/categories');
            const data = await res.json();
            setData(data.data);
        }
        fetchData()
    });

    return (
        <div className="px-4 md:px-7">
            <div className="mt-5">
                <div className="flex items-center bg-primary-800 text-primary-200 text-sm py-3 px-3 rounded-lg">
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
                {/* {metadata &&
                    <div className="pt-6 pb-4 px-5">
                        <PaginationNavigator pagination={metadata} callback={navigatePage}/>
                    </div>
                } */}
            </div>
        </div>
    )
}

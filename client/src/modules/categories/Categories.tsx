import React, { useEffect, useState } from 'react';
import CategoriesListItem from './CategoriesListItem';
import { config } from '../../app.config';

export const Categories: React.FC = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch(`${config.url.API_URL}/categories`);
            const data = await res.json();
            setData(data.data);
        }
        fetchData();
    }, []);

    return (
        <div className="px-4 md:px-6">
            <div className="mt-5">
                <div className="flex items-center bg-primary-800 text-primary-200 text-sm p-3 rounded-lg">
                    <div className="w-1/3 pr-3">
                        <p>Category</p>
                    </div>
                    <div className="w-1/6">
                        <p>Satellite Count</p>
                    </div>
                </div>
                <div className="px-3">
                    {data && data.map((item: any, index: number) => {
                        return (
                            <CategoriesListItem category={item} key={index}/>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

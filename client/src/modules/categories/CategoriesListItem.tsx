import React from 'react';
import { Link } from 'react-router-dom';
import { category } from '../../types/other';

interface CategoriesListItemProps {
    category: category,
}

export const CategoriesListItem: React.FC<CategoriesListItemProps> = ({
    category,
}) => {
    return (
        <div className="flex items-center my-6 text-sm">
            <div className="w-1/3 pr-3">
                <Link to={`/categories/${category.cat_id}`}>
                    <p className="uppercase">{category.name}</p>
                </Link>
            </div>
            <div className="w-1/6">
                {category.count}
            </div>
        </div>
    )
}

export default CategoriesListItem;

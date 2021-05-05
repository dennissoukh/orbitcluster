import React from 'react';
import { VscArrowRight, VscArrowLeft } from 'react-icons/vsc';
import { pagination } from '../../types/pagination';

interface PaginationNavigatorProps {
    pagination: pagination,
    callback: Function,
}

const PaginationNavigator: React.FC<PaginationNavigatorProps> = ({
    pagination,
    callback
}) => {
    return (
        <div className="flex justify-between text-primary-200">
            <div>
                <p>{pagination.skip} — {pagination.pageCount + pagination.skip} of {pagination.count}</p>
            </div>
            <div className="flex items-center">
                { pagination.page !== 0 &&
                    <div className="pr-3">
                        <div className="cursor-pointer" onClick={() => callback(-1)}>
                            <VscArrowLeft size="18"/>
                        </div>
                    </div>
                }
                <div>
                    <p>{pagination.page} of {pagination.pages}</p>
                </div>
                { pagination.page < pagination.pages &&
                    <div className="pl-3">
                        <div className="cursor-pointer" onClick={() => callback(1)}>
                            <VscArrowRight size="18"/>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

export default PaginationNavigator;

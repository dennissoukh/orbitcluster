import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { VscChevronRight, VscChevronDown } from 'react-icons/vsc';

interface NavigationItemProps {
    name: string,
    url?: string,
    sublist?: any,
}

const NavigationItem: React.FC<NavigationItemProps> = ({
    name,
    url = '#',
    sublist,
}) => {
    const [active, setActive] = useState(false);

    return (
        <>
            {sublist ? (
                <div
                    className="flex justify-between items-center py-3 select-none px-6 cursor-pointer"
                    onClick={() => setActive(!active)}
                >
                    <div className="font-semibold">
                        {name}
                    </div>
                    {active ? (
                        <VscChevronDown size="15px"/>
                    ) : (
                        <VscChevronRight size="15px"/>
                    )}
                </div>
            ) : (
                <Link to={url}>
                    <div className="px-6 py-3 select-none">
                        <div className="font-semibold">
                            {name}
                        </div>
                    </div>
                </Link>
            )}

            {sublist && active && sublist.map((item: any, index: number) => {
                return (
                    <Link to={item.url} key={index}>
                        <div className="py-3">
                            <div className="px-6">
                                <div className="text-muted">
                                    {item.name}
                                </div>
                            </div>
                        </div>
                    </Link>
                )
            })}
        </>
    )
};

export default NavigationItem;

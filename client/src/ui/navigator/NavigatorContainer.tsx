import React from 'react';
import { VscSearch, VscAccount } from 'react-icons/vsc';

interface NavigatorContainerProps {
    title?: string
}

const NavigatorContainer: React.FC<NavigatorContainerProps> = ({
    title
}) => {
    return (
        <div className="py-5 px-6 w-full z-10 relative">
            <div className={title ? 'flex items-center justify-between' : 'flex items-center justify-end'}>
                {title &&
                    <div>
                        <h4 className="font-semibold">{title}</h4>
                    </div>
                }
                <div className="flex items-center">
                    <div>
                        <VscSearch size={20}/>
                    </div>
                    <div className="ml-5">
                        <div className="bg-tertiary rounded-full w-30 h-30 flex items-center justify-center">
                            <VscAccount size={20}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NavigatorContainer;

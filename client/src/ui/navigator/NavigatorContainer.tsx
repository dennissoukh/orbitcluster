import React from 'react';
import { VscSearch, VscAccount } from 'react-icons/vsc';

const NavigatorContainer: React.FC = () => {
    return (
        <div className="py-5 px-6 w-full">
            <div className="flex items-center justify-end">
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
    );
};

export default NavigatorContainer;

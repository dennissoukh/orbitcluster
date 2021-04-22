import React from 'react';
import HeaderContainer from '../../ui/header/HeaderContainer';

const MobileLayout: React.FC = ({ children }) => {
    return (
        <>
            <HeaderContainer/>
            <div className="px-6">
                {children}
            </div>
        </>
    )
};

export default MobileLayout;

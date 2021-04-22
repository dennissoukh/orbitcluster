import React from 'react';
import NavigatorContainer from '../../ui/navigator/NavigatorContainer';
import SidebarContainer from '../../ui/sidebar/SidebarContainer';

const DesktopLayout: React.FC = ({ children }) => {
    return (
        <div className="flex">
            <SidebarContainer/>
            <div className="w-full">
                <NavigatorContainer/>
                <div className="px-6">
                    {children}
                </div>
            </div>
        </div>
    )
};

export default DesktopLayout;

import React from 'react';
import NavigatorContainer from '../../ui/navigator/NavigatorContainer';
import SidebarContainer from '../../ui/sidebar/SidebarContainer';

const DesktopLayout: React.FC = () => {
    return (
        <div className="flex">
            <SidebarContainer/>
            <NavigatorContainer/>
        </div>
    )
};

export default DesktopLayout;

import React from 'react';
import { useScreenType } from "../../hooks/useScreenType";
import HeaderContainer from '../../ui/header/HeaderContainer';
import NavigatorContainer from '../../ui/navigator/NavigatorContainer';
import SidebarContainer from '../../ui/sidebar/SidebarContainer';

const ApplicationLayout: React.FC = ({ children }) => {
    const screenType = useScreenType();

    const isDesktop = () => {
        return !!(screenType === 'desktop');
    }

    return (
        <div className={isDesktop() ? 'flex' : undefined}>
            {isDesktop()
                ? <SidebarContainer/>
                : <HeaderContainer/>
            }
            <div className={isDesktop() ? 'w-full' : undefined}>
                {isDesktop() &&
                    <NavigatorContainer/>
                }
                <div className={isDesktop() ? 'px-7 py-5' : 'px-4 md:px-6 py-5'}>
                    {children}
                </div>
            </div>
        </div>
    )
};

export default ApplicationLayout;

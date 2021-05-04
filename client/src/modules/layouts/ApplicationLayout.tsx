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
                {/* <div className={isDesktop() ? 'py-5' : 'py-5'}>
                    {children}
                </div> */}
                <div>
                    {children}
                </div>
            </div>
        </div>
    )
};

export default ApplicationLayout;

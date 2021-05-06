import React from 'react';
import { useScreenType } from "../../hooks/useScreenType";
import DesktopHeaderContainer from '../../ui/desktop-header/DesktopHeaderContainer';
import MobileHeaderContainer from '../../ui/mobile-header/MobileHeaderContainer';

const ApplicationLayout: React.FC = ({ children }) => {
    const screenType = useScreenType();

    const isDesktop = () => {
        return !!(screenType === 'desktop');
    }

    return (
        <div>
            {isDesktop()
                ? <DesktopHeaderContainer/>
                : <MobileHeaderContainer/>
            }
            <div className="w-full pt-8 max-w-1470 ml-auto mr-auto">
                {children}
            </div>
        </div>
    )
};

export default ApplicationLayout;

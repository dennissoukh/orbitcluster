import React from 'react';
import { Link } from 'react-router-dom';
import {
    VscActivateBreakpoints as Logo
} from 'react-icons/vsc';
import Header from '../navigation-menu/Header';

const DesktopHeaderContainer: React.FC = () => {
    return (
        <>
            <div className="absolute w-full right-0 max-w-1470 left-1/2 transform -translate-x-1/2" style={{ zIndex: 1000 }}>
                <div className="px-6 py-1">
                    <div className="flex items-center h-70">
                        <div>
                            <Link to="/">
                                <Logo size="25px"/>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <Header/>
        </>
    )
};

export default DesktopHeaderContainer;

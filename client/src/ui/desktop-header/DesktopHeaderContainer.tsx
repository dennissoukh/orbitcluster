import React from 'react';
import { Link } from 'react-router-dom';
import {
    VscActivateBreakpoints as Logo
} from 'react-icons/vsc';
import Header from '../navigation-menu/Header';

const DesktopHeaderContainer: React.FC = () => {
    return (
        <>
            <div className="absolute w-full left-0 right-0" style={{ maxWidth: '1470px', left: '50%', transform: 'translateX(-50%)' }}>
                <div className="px-6 py-1 mx-4 ">
                    <div className="flex items-center" style={{ height: '70px' }}>
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

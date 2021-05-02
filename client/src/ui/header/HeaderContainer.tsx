import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
    VscActivateBreakpoints as Logo,
    VscMenu,
    VscChromeClose }
from 'react-icons/vsc';
import {
    MdHome,
    MdExplore,
    MdTimeline,
    MdGpsFixed,
    MdMap,
    MdLanguage,
    MdStorage,
    MdAddCircleOutline,
    MdLayers,
    MdTrackChanges
} from 'react-icons/md';
import { useEffect } from 'react';

const HeaderContainer: React.FC = () => {
    const location = useLocation();
    const [active, setActive] = useState(false);

    useEffect(() => {
        setActive(false);
    }, [location]);

    return (
        <>
            <div className="px-4 md:px-6 pt-5 flex justify-between">
                <div>
                    <Link to="/">
                        <Logo size="30px"/>
                    </Link>
                </div>
                <div>
                    <div className="px-2 py-1 bg-secondary bg-opacity-50 rounded-full cursor-pointer" onClick={() => setActive(!active)}>
                        <VscMenu size="20px"/>
                    </div>
                </div>
            </div>
            {active &&
                <div className="absolute top-1 left-0 right-0 p-5 bg-white m-3 rounded-lg text-primary shadow-lg">
                    <div className="flex justify-between">
                        <div>
                            <span className="text-muted font-semibold text-sm uppercase">Application</span>
                        </div>
                        <div className="cursor-pointer">
                            <VscChromeClose size="20px" onClick={() => setActive(!active)}/>
                        </div>
                    </div>
                    <div className="mt-4">
                        <div className="flex">
                            <div className="flex-grow w-1/3">
                                <Link to="/" className="flex items-center font-semibold">
                                    <div className="pr-1">
                                        <MdHome size="14px"/>
                                    </div>
                                    <span>Dashboard</span>
                                </Link>
                            </div>
                            <div className="flex-grow w-1/3">
                                <Link to="/" className="flex items-center font-semibold">
                                    <div className="pr-1">
                                        <MdTimeline size="14px"/>
                                    </div>
                                    <span>App Status</span>
                                </Link>
                            </div>
                            <div className="flex-grow w-1/3">
                                <Link to="/" className="flex items-center font-semibold">
                                    <div className="pr-1">
                                        <MdExplore size="14px"/>
                                    </div>
                                    <span>About</span>
                                </Link>
                            </div>
                        </div>
                        <div className="mt-6">
                            <div>
                                <span className="text-muted font-semibold text-sm uppercase">Satellites</span>
                            </div>
                            <div className="mt-4">
                                <div className="flex">
                                    <div className="w-1/3">
                                        <Link to="/satellites" className="flex items-center font-semibold">
                                            <div className="pr-1">
                                                <MdStorage size="14px"/>
                                            </div>
                                            <span>Satellite Catalog</span>
                                        </Link>
                                    </div>
                                    <div className="w-1/3">
                                        <Link to="/recent/launched" className="flex items-center font-semibold">
                                            <div className="pr-1">
                                                <MdAddCircleOutline size="14px"/>
                                            </div>
                                            <span>Recently Launched</span>
                                        </Link>
                                    </div>
                                    <div className="w-1/3">
                                        <Link to="/categories" className="flex items-center font-semibold">
                                            <div className="pr-1">
                                                <MdLayers size="14px"/>
                                            </div>
                                            <span>Categories</span>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-3">
                                <div className="flex">
                                    <div className="w-1/3">
                                        <Link to="/" className="flex items-center font-semibold">
                                            <div className="pr-1">
                                                <MdTrackChanges size="14px"/>
                                            </div>
                                            <span>Amateur Radio</span>
                                        </Link>
                                    </div>
                                    <div className="w-1/3">
                                        <Link to="/" className="flex items-center font-semibold">
                                            <div className="pr-1">
                                                <MdHome size="14px"/>
                                            </div>
                                            <span>Starlink</span>
                                        </Link>
                                    </div>
                                    <div className="w-1/3">
                                        <Link to="/" className="flex items-center font-semibold">
                                            <div className="pr-1">
                                                <MdHome size="14px"/>
                                            </div>
                                            <span>Starlink</span>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-6">
                            <div>
                                <span className="text-muted font-semibold text-sm uppercase">Tools</span>
                            </div>
                            <div className="mt-3">
                                <div className="flex">
                                    <div className="w-1/3">
                                        <Link to="/" className="flex items-center font-semibold">
                                            <div className="pr-1">
                                                <MdGpsFixed size="14px"/>
                                            </div>
                                            <span>Pass Predictions</span>
                                        </Link>
                                    </div>
                                    <div className="w-1/3">
                                        <Link to="/" className="flex items-center font-semibold">
                                            <div className="pr-1">
                                                <MdMap size="14px"/>
                                            </div>
                                            <span>2D Map</span>
                                        </Link>
                                    </div>
                                    <div className="w-1/3">
                                        <Link to="/" className="flex items-center font-semibold">
                                            <div className="pr-1">
                                                <MdLanguage size="14px"/>
                                            </div>
                                            <span>3D Map</span>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
};

export default HeaderContainer;

import React from 'react';
import { Link } from 'react-router-dom';
import { VscActivateBreakpoints as Logo } from 'react-icons/vsc';
import NavigationItem from './NavigationItem';

const SidebarContainer: React.FC = () => {
    return (
        <div className="w-300 h-screen bg-secondary">
            <div className="px-6 pt-5 pb-3 mb-4">
                <div className="flex justify-between items-center">
                    <div>
                        <Link to="/">
                            <Logo size="30px"/>
                        </Link>
                    </div>
                </div>
            </div>
            <div>
                <NavigationItem name="Dashboard" url="/dashboard"/>

                <NavigationItem name="Database" sublist={[
                    {
                        name: 'Recently Launched',
                        url: '/recently-launched',
                    },
                    {
                        name: 'Recently Decayed',
                        url: '/recently-decayed',
                    },
                ]}/>

                <NavigationItem name="Visualizations" sublist={[
                    {
                        name: '2D Map',
                        url: '/2d-map',
                    },
                    {
                        name: '3D Map',
                        url: '/3d-map',
                    },
                ]}/>

                <NavigationItem name="Daily Predictions" url="/daily-predictions"/>

                <NavigationItem name="Search" url="/search"/>
            </div>
        </div>
    );
};

export default SidebarContainer;

import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useScreenType } from './hooks/useScreenType';
import DesktopLayout from './modules/layouts/DesktopLayout';
import MobileLayout from './modules/layouts/MobileLayout';
import Satellites from './pages/Satellites';

const App: React.FC = () => {
    const screenType = useScreenType();

    return (
        <Router>
            {screenType === 'desktop' ? (
                <DesktopLayout>
                    {renderRoutes()}
                </DesktopLayout>
            ) : (
                <MobileLayout>
                    {renderRoutes()}
                </MobileLayout>
            )}
        </Router>
    );
};

const renderRoutes = () => {
    return (
        <Switch>
            <Route path="/satellites" component={Satellites}/>
        </Switch>
    );
};

export default App;

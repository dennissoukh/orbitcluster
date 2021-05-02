import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ApplicationLayout from './modules/layouts/ApplicationLayout';
import Satellites from './pages/Satellites';
import Satellite from './pages/Satellite';
import RecentlyLaunched from './pages/RecentlyLaunched';
import RecentlyDecayed from './pages/RecentlyDecayed';
import Operators from './pages/Operators';
import Operator from './pages/Operator';
import { CesiumMapper } from './pages/Visualizations';
import LaunchSites from './pages/LaunchSites';

const App: React.FC = () => {
    return (
        <Router>
            <ApplicationLayout>
                {renderRoute()}
            </ApplicationLayout>
        </Router>
    );
};

const renderRoute = () => {
    return (
        <Switch>
            <Route path="/satellites" exact component={Satellites}/>
            <Route path="/satellites/:id" component={Satellite}/>
            <Route path="/recent/new" component={RecentlyLaunched}/>
            <Route path="/recent/decayed" component={RecentlyDecayed}/>
            <Route path="/operators" exact component={Operators}/>
            <Route path="/operators/:id" component={Operator}/>
            <Route path="/viz/3d" component={CesiumMapper}/>
            <Route path="/launch-sites" component={LaunchSites}/>
        </Switch>
    );
};

export default App;

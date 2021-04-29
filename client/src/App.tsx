import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ApplicationLayout from './modules/layouts/ApplicationLayout';
import Satellites from './pages/Satellites';
import Satellite from './pages/Satellite';
import RecentlyLaunched from './pages/RecentlyLaunched';
import RecentlyDecayed from './pages/RecentlyDecayed';

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
        </Switch>
    );
};

export default App;

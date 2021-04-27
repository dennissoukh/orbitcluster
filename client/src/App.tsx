import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ApplicationLayout from './modules/layouts/ApplicationLayout';
import Satellites from './pages/Satellites';
import Satellite from './pages/Satellite';

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
        </Switch>
    );
};

export default App;

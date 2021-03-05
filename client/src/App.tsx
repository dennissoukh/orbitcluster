import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import AuthLayout from './layouts/Auth';
import Layout from './layouts/Layout';
import { Login } from './views/Auth/Login';
import { Register } from './views/Auth/Register';
import { ResetPassword } from './views/Auth/passwords/Reset';
import MainLayout from './layouts/Main';
import { Welcome } from './views/Base/Welcome';

const App: React.FC = () => (
    <BrowserRouter>
        <Route path={['/login', '/register', '/password/reset']} exact>
            <Layout layout={AuthLayout}>
                <Route path={'/login'} exact component={() => <Login/>}/>
                <Route path={'/register'} exact component={() => <Register/>}/>
                <Route path={'/password/reset'} exact component={() => <ResetPassword/>}/>
            </Layout>
        </Route>
        <Route path='/' exact>
            <Layout layout={MainLayout}>
                <Route path={'/'} exact component={() => <Welcome/>}/>
            </Layout>
        </Route>
    </BrowserRouter>
);

export default App;

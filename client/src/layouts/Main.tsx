import React from 'react';
import Header from '../components/NavigationMenu/Header';

const MainLayout: React.FC = ({ children }) => {
    return (
        <div>
            {/* <ul>
                <li>
                    <Link to="/login">Login</Link>
                </li>
                <li>
                    <Link to="/register">Register</Link>
                </li>
                <li>
                    <Link to="/password/reset">Reset password</Link>
                </li>
                <li>
                    <Link to="/">Welcome</Link>
                </li>
            </ul> */}
            <Header/>
            {children}
        </div>
    );
}

export default MainLayout;

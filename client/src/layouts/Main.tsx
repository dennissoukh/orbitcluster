import React from 'react';
import { Link } from 'react-router-dom';

const MainLayout: React.FC = ({ children }) => {
    return (
        <div>
            <h3>Main Layout</h3>
            <ul>
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
            </ul>
            {children}
        </div>
    );
}

export default MainLayout;

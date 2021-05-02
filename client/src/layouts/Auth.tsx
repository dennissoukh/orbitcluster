import React from 'react';
// import { Link } from 'react-router-dom';

const AuthLayout: React.FC<{ children: any }> = ({ children }) => {
    return (
        <div>
            {/* <h3>Auth Layout</h3>
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
            </ul> */}
            <div>
                {children}
            </div>
        </div>
    );
}

export default AuthLayout;

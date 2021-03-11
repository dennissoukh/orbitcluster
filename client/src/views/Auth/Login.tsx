import React from 'react';
import CSS from 'csstype';
import { Link } from 'react-router-dom';

const authStyles: CSS.Properties = {
    width: '500px'
}

export class Login extends React.Component {
    render() {
        return (
            <div className="d-flex align-items-center justify-content-center min-vh-100">
                <div className="auth-container" style={authStyles}>
                    <h1 className="font-bold">Login</h1>
                    <div className="mt-4">
                        <form>
                            <div className="form-group">
                                <span className="label text-small">Email Address</span>
                                <input type="text"/>
                            </div>
                            <div className="form-group mt-4">
                                <span className="label text-small">Password</span>
                                <input type="password"/>
                            </div>
                            <div className="form-group mt-4">
                                <button className="btn w-100">Login</button>
                            </div>
                        </form>
                    </div>
                    <div className="mt-4 d-flex justify-content-center">
                        <div>
                            <Link to="/register" className="text-small">Need an account?</Link>
                        </div>
                        <div className="px-2">|</div>
                        <div>
                            <Link to="/password/reset" className="text-small">Forgot password?</Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

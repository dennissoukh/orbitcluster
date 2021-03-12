import React from 'react';
import CSS from 'csstype';
import { Link } from 'react-router-dom';

const authStyles: CSS.Properties = {
    width: '500px'
}

export class ResetPassword extends React.Component {
    render() {
        return (
            <div className="d-flex align-items-center justify-content-center min-vh-100">
                <div className="auth-container" style={authStyles}>
                    <h1 className="font-bold">Reset Password</h1>
                    <div className="mt-4">
                        <form>
                            <div className="form-group">
                                <span className="label text-small">Email Address</span>
                                <input type="text"/>
                            </div>
                            <div className="form-group mt-4">
                                <button className="btn w-100">Send Reset Email</button>
                            </div>
                        </form>
                    </div>
                    <div className="mt-4 d-flex justify-content-center">
                        <div>
                            <Link to="/login" className="text-small">Remembered your password?</Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

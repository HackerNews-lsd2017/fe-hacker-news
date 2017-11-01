import React from 'react';
import '../../styles/App.css';

export default class extends React.Component {
    render() {
        return (
            <div className="auth-container">
                <div className="login-container">
                    <div>
                        <b>Login</b>
                    </div>
                    <br/>

                    <table>
                        <tbody>
                            <tr>
                                <td>username:</td>
                                <td><input type="text"/></td>
                            </tr>
                            <tr>
                                <td>password:</td>
                                <td><input type="text"/></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <br/>

                <button>login</button>
                <br/>
                <br/>

                <div>
                    <a href="" className="pass-recovery">Forgot your password?</a>
                </div>
                <br/>

                <div className="login-container">
                    <div>
                        <b>Create Account</b>
                    </div>
                    <br/>

                    <div>
                        <table>
                            <tbody>
                                <tr>
                                    <td>username:</td>
                                    <td><input type="text"/></td>
                                </tr>
                                <tr>
                                    <td>password:</td>
                                    <td><input type="text"/></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <br/>
                    
                    <div>
                        <button>create account</button>
                    </div>
                </div>
            </div>
        )
    }
}

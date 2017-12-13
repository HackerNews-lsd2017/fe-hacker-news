import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import AuthActions from '../actions/AuthActionCreators';

export default class extends React.Component {
    static propTypes = {
        authenticated: PropTypes.bool,
        user: PropTypes.object
    }

    logOut = () => {
        AuthActions.logOut();
    }

    render() {
        let {authenticated, user} = this.props;
        
        return (
            <table className="app-header">
                <tbody>
                    <tr>
                        <td className="header-logo"></td>
                        <td className="header-left">
                            <span className="page-top">
                                <b>
                                    <Link to="/">
                                        <div className="logo">
                                            <img src="https://news.ycombinator.com/y18.gif" alt=""/>
                                        </div>
                                        Hacker News
                                    </Link>
                                    <div className="header-content">
                                        <Link to="">new</Link>
                                        <span> | </span>
                                        <Link to="">comments</Link>
                                        <span> | </span>
                                        <Link to="">show</Link>
                                        <span> | </span>
                                        <Link to="">ask</Link>
                                        <span> | </span>
                                        <Link to="">jobs</Link>
                                        <span> | </span>
                                        <Link to={authenticated ? "/submit" : "/login"}>submit</Link>
                                    </div>
                                </b>
                            </span>
                        </td>
                        <td className="header-right">
                        {authenticated ?
                            <div>
                                <span style={{display: "inline-block"}}>
                                    <Link to="/user">
                                        {user.username}(1)
                                    </Link>&nbsp;|
                                </span>
                                <div style={{display: "inline-block"}}
                                onClick={this.logOut}>
                                    <span className="logout-button">&nbsp;logout</span>
                                </div>
                            </div>
                            :
                            <div>
                                <Link to="/login">login</Link>
                            </div>
                        }
                        </td>
                    </tr>
                </tbody>
            </table>
        );
    }
};

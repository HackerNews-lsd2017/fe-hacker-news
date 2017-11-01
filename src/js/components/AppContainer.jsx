import React from 'react';
import actions from '../actions/actions';
import '../../styles/App.css';
import {Link} from 'react-router-dom';

export default class extends React.Component {
    getPosts  = () => {
        actions.getPosts(10);
    }

    _onBackClick = () => {
        let {router} = this.context;

        router.push({
            name: 'casefile-creator'
        });
    }

    render = () => {
        return (
            <div className="app">
                <table className="app-header">
                    <tbody>
                        <tr>
                            <td className="header-logo"></td>
                            <td className="header-left">
                                <span className="page-top">
                                    <b>
                                        <div className="logo">
                                        <img src="/public/logo.png" alt=""/>
                                            <Link to="/ ">Hacker News</Link>
                                        </div>
                                        <div className="header-content">
                                            <Link to="/login">new</Link>
                                            <span> | </span>
                                            <Link to="/login">comments</Link>
                                            <span> | </span>
                                            <Link to="/login">show</Link>
                                            <span> | </span>
                                            <Link to="/login">ask</Link>
                                            <span> | </span>
                                            <Link to="/login">jobs</Link>
                                            <span> | </span>
                                            <Link to="/login">submit</Link>
                                        </div>
                                    </b>
                                </span>
                            </td>
                            <td className="header-right">
                                <Link to="/login">login</Link>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div className="content">
                    {this.props.children}
                </div>
            </div>
        )
   
    }
}

import React from 'react';
import actions from '../actions/actions';
import {Link} from 'react-router-dom';
import DocumentStore from '../stores/DocumentStore';
import Story from './Story';
import '../../styles/App.css';

export default class extends React.Component {
    state = {
        posts: []
    }

    componentDidMount = () => {
        DocumentStore.addChangeListener(this.onChange);
        this.loadData();
    }

    loadData = () => {
        this.getPosts();
    }

    onChange = () => {
        this.setState({
            posts: DocumentStore.getPosts()
        });
    }

    getPosts = () => {
        actions.getPosts(10);
    }

    _onBackClick = () => {
        let {router} = this.context;

        router.push({
            name: 'casefile-creator'
        });
    }

    render = () => {
    let {posts} = this.state;

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
                <div className="app">
                    <div className="app-header">
                        
                    </div>
                    <div className="app-content">
                        {posts.map((post, index) =>
                            <Story key={index} index={index + 1} data={post} />
                        )}
                    </div>
                </div>
            </div>

        )
   
    }
}

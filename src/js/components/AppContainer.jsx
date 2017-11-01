import React from 'react';
import PostActions from '../actions/PostActionCreators';
import {Link} from 'react-router-dom';
import PostStore from '../stores/PostStore';
import Submit from './Submit';
import Newest from './Newest';
import '../../styles/App.css';

export default class extends React.Component {
    state = {
        posts: [],
        user: {},
        authenticated: PostStore.getAuth()
    }

    componentDidMount = () => {
        PostStore.addChangeListener(this.onChange);
        this.loadData();
    }

    componentWillUnmount = () => {
        PostStore.removeChangeListener(this.onChange);
    }

    loadData = () => {
        this.getPosts();
    }

    onChange = () => {
        this.setState({
            posts: PostStore.getPosts(),
            user: PostStore.getUser(),
            authenticated: PostStore.getAuth()
        });
    }

    getPosts = () => {
        PostActions.getPosts(15);
    }

    logOut = () => {
        PostActions.logOut();
    }

    render = () => {
        let {posts, user, authenticated} = this.state;

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
                            {authenticated ?
                                <div onClick={this.logOut}>logout</div>
                                :
                                <Link to="/login">login</Link>
                            }
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
                        <div className="newest-posts">
                            <Newest posts={posts} />
                        </div>

                        {user.username ? 
                            <div className="submit-new-post">
                                <Submit />
                            </div>
                        : null}
                    </div>
                </div>
            </div>
        )
    }
}

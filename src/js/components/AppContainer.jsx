import React from 'react';
import Actions from '../actions/PostActionCreators';
import Store from '../stores/PostStore';
import Header from './Header';
import Content from './Content';
import '../../styles/App.css';

export default class extends React.Component {
    state = {
        posts: [],
        user: {},
        authenticated: Store.getAuth(),
        loadMore: 1
    }

    componentDidMount = () => {
        Store.addChangeListener(this.onChange);
        Actions.checkAuth();
        this.loadData();
    }

    componentWillUnmount = () => {
        Store.removeChangeListener(this.onChange);
    }

    onChange = () => {
        this.setState({
            posts: Store.getPosts(),
            user: Store.getUser(),
            authenticated: Store.getAuth()
        });
    }

    // @todo: it's a hack - waiting for the backend
    loadData = () => {
        let {loadMore} = this.state;
        Actions.getPosts(30 * loadMore);
        this.setState({
            loadMore: loadMore + 1
        });
    }

    render = () => {
        let {posts, user, authenticated} = this.state;
        return (
            <div className="app">
                <Header user={user} authenticated={authenticated}/>
                <Content posts={posts} loadPosts={this.loadData}/>
            </div>
        )
    }
}

import React from 'react';
import PostActions from '../actions/PostActionCreators';
import PostStore from '../stores/PostStore';
import Header from './Header';
import Content from './Content';
import '../../styles/App.css';

export default class extends React.Component {
    state = {
        posts: [],
        user: {},
        authenticated: PostStore.getAuth(),
        loadMore: 1
    }

    componentDidMount = () => {
        PostStore.addChangeListener(this.onChange);
        this.loadData();
    }

    componentWillUnmount = () => {
        PostStore.removeChangeListener(this.onChange);
    }

    onChange = () => {
        this.setState({
            posts: PostStore.getPosts(),
            user: PostStore.getUser(),
            authenticated: PostStore.getAuth()
        });
    }

    // @todo: it's a hack - waiting for the backend
    loadData = () => {
        let {loadMore} = this.state;
        PostActions.getPosts(30 * loadMore);
        this.setState({
            loadMore: loadMore + 1
        });
    }

    logOut = () => {
        PostActions.logOut();
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

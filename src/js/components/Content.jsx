import React from 'react';
import Newest from './Newest';
import Store from '../stores/PostStore';
import Actions from '../actions/PostActionCreators';

export default class extends React.Component {
    state = {
        posts: [],
        loadMore: 1
    }

    componentDidMount = () => {
        Store.addChangeListener(this.onChange);
        this.loadPosts();
    }

    componentWillUnmount = () => {
        Store.removeChangeListener(this.onChange);
    }

    onChange = () => {
        this.setState({
            posts: Store.getPosts()
        });
    }

        // @todo: it's a hack - waiting for the backend
    loadPosts = () => {
        let {loadMore} = this.state;
        Actions.getPosts(30 * loadMore);
        this.setState({
            loadMore: loadMore + 1
        });
    }

    render() {
        let {posts} = this.state;

        return (
            <div className="app-content">
                <div className="newest-posts">
                    {posts.length > 0 ?
                        <Newest posts={posts} />
                    : null}
                </div>

                <div className="app-footer">
                    <p className="more-button" onClick={this.loadPosts}>More</p>
                    <hr />
                </div>
            </div>
        );
    }
};

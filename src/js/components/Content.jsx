import React from 'react';
import Newest from './Newest';
import PostStore from '../stores/PostStore';
import PostActions from '../actions/PostActionCreators';
import Constants from '../Constants';

export default class extends React.Component {
    state = {
        posts: [],
        pageCount: 0,
    }

    componentWillMount = () => {
        PostActions.getPosts(0, Constants.POSTS_AMOUNT);
    }

    componentDidMount = () => {
        PostStore.addChangeListener(this.onChange);
    }

    componentWillUnmount = () => {
        PostStore.removeChangeListener(this.onChange);
    }

    onChange = () => {
        this.setState({
            posts: PostStore.getPosts()
        });
    }

    loadPosts = () => {
        let {pageCount} = this.state;
        let newPage = pageCount + 1
        PostActions.getPosts(newPage, Constants.POSTS_AMOUNT);
        this.setState({
            pageCount: newPage
        });
    }

    render() {
        let {posts} = this.state;

        return (
            <div className="app-content">
                <div className="newest-posts">
                    {posts.length > 0 ?
                        <Newest posts={posts} />
                    : ''}
                </div>

                <div className="app-footer">
                    <p className="more-button" onClick={this.loadPosts}>More</p>
                    <hr />
                </div>
            </div>
        );
    }
};

import React from 'react';
import PropTypes from 'prop-types';
import Post from './Post';
import PostStore from '../stores/PostStore';
import PostActions from '../actions/PostActionCreators';

export default class extends React.Component {
    static propTypes = {
        posts: PropTypes.array
    }

    state = {
        upVotes: PostStore.getPostsKarma()
    }

    componentDidMount = () => {
        PostActions.fetchKarma();
        PostStore.addChangeListener(this.onChange);
    }

    componentWillUnmount = () => {
        PostStore.removeChangeListener(this.onChange);
    }

    onChange = () => {
        this.setState({
            upVotes: PostStore.getPostsKarma()
        });
    }

    checkUpVote = (hanesst_id) => {
        let {upVotes} = this.state;
        let id = hanesst_id.toString();
        if(upVotes.posts) {
            if(upVotes.posts[id]) {
                return true;
            }
        }
        return false;
    }

    upVote = (hanesst_id) => {
        PostActions.upVote(hanesst_id);
    }

    render() {
        let {posts} = this.props;

        return (
            <div className="newest-container">
                {posts.map((p, index) =>
                    <Post key={index}
                    index={index + 1}
                    post={p.post}
                    upVoted={this.checkUpVote(p.post.hanesst_id)}
                    upVote={this.upVote.bind(null, p.post.hanesst_id)}
                    commentsCount={p.count} />
                )}
            </div>
        );
    }
};

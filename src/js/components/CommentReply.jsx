import React from 'react';
import AuthStore from '../stores/AuthStore';
import PostStore from '../stores/PostStore';
import PostActions from '../actions/PostActionCreators';
import {Link} from 'react-router-dom';

export default class extends React.Component {
    state = {
        newComment: "",
        comments: [],
        post: PostStore.getPost()
    }

    componentDidMount = () => {
        this.loadData();
        PostStore.addChangeListener(this.onChange);
    }

    componentWillUnmount = () => {
        PostStore.removeChangeListener(this.onChange);
    }

    loadData = () => {
        let {post} = this.props;
        let {id} = this.props.match.params;
        
        if (id && !post) {
            PostActions.getComments(id);
        }
    }

    onChange = () => {
        this.setState({
            newComment: PostStore.getComment()
        });
    }

    onChange = () => {
        this.setState({
            newComment: PostStore.getComment(),
            comments: PostStore.getComments(),
            post: PostStore.getPost()
        });
    }

    _getTime = () => {
        let {timestamp} = this.props.comment;
        let dateNow = new Date();
        let postDate = new Date(timestamp);
        // get total seconds between two dates
        let s = Math.abs(dateNow - postDate) / 1000;
        // round seconds
        s = Math.floor(s);

        if (s < 60) {
            if (s === 1) {
                return s + " second ago";
            }
            return s + " seconds ago";
        } else if (s >= 60 && s < 3600) {
            // calculate whole minutes
            let minutes = Math.floor(s / 60) % 60;
            if (minutes === 1) {
                return minutes + " minute ago";
            }
            return minutes + " minutes ago";
        } else if (s >= 3600 && s < 86400) {
            // calculate whole hours
            let hours = Math.floor(s / 3600) % 24;
            if (hours === 1) {
                return hours + " hour ago";
            }
            return hours + " hours ago";
        } else if (s >= 86400) {
            // calculate whole days
            let days = Math.floor(s / 86400);
            if (days === 1) {
                return days + " day ago";
            }
            return days + " days ago";
        }
    }

    addComment = () => {
        let {newComment, post} = this.state;
        let postTemplate = {
            post_title: "",
            post_text: newComment, 
            hanesst_id: 0, 
            post_type: "comment", 
            post_parent: post.hanesst_id,
            username: AuthStore.getUser().username,
            pwd_hash: "fyQgkcLMD1", 
            post_url: ""
        }

        PostActions.submitPost(postTemplate);
    }

    onCommentChange = (event) => {
        let {target} = event;

        PostActions.updateComment(target.value);
    }

    render() {
        let {post, newComment} = this.state;

        return (
            <div className="comment-container">
                <div className="story-container">
                <div>{post.username}</div>

                <div>{post.post_text}</div>
                    <div className="comment-area">
                        <textArea
                        value={newComment}
                        onChange={this.onCommentChange}/>
                        <button onClick={this.addComment}>
                            <Link className="reply"
                            to={'/reply/' + post.post_parent}
                            onClick={this.onReplyClick}>reply</Link>
                        </button>
                    </div>
                </div>
            </div>
        );
    }
};

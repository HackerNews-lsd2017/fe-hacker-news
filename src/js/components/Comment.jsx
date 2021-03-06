import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import PostActions from '../actions/PostActionCreators';

export default class extends React.Component {
    static propTypes = {
        comment: PropTypes.object,
        className: PropTypes.string,
        authenticated: PropTypes.bool,
        upVoted: PropTypes.bool,
        upVote: PropTypes.func
    }

    defaultProps = {
        comments: {},
        authenticated: false
    }

    // TODO: iplement
    collapseComments = () => {
        console.log("collapse");
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

    onReplyClick = () => {
        let {comment} = this.props;
        PostActions.setPost(comment);
    }

    render() {
        let {comment, className, authenticated, upVoted, upVote} = this.props;

        return (
            <div className={className}>
                <span className={"title-text" + (upVoted ? " active" : "")}
                onClick={upVote}>&#9650;&nbsp;</span>
                <div className="comment-header">
                    {comment.username} {this._getTime()} <span onClick={this.collapseComments}>[-]</span>
                </div>
                <div className="comment-content">
                    {comment.post_text}
                </div>
                <div className="comment-footer">
                {authenticated &&
                    <Link className="reply"
                    to={'/reply/' + comment.hanesst_id}
                    onClick={this.onReplyClick}>reply</Link>
                }
                </div>
            </div>
        );
    }
};

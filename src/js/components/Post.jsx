import React from 'react';
import PropTypes from 'prop-types';
import parseDomain from 'parse-domain';
import PostActions from '../actions/PostActionCreators';
import {Link} from 'react-router-dom';

export default class extends React.Component {
    static propTypes = {
        post: PropTypes.object.isRequired,
        commentsCount: PropTypes.number,
        index: PropTypes.number
    }

    onCommentClick = () => {
        let {post} = this.props;
        PostActions.setPost(post);
    }

    _getDomain = () => {
        let url = this.props.post.post_url;

        if (parseDomain(url)) {
            return parseDomain(url).domain + "." + parseDomain(url).tld;
        } else {
            return '--';
        }
    }

    getCommentsAmount = () => {
        let {commentsCount} = this.props;

        if (commentsCount === 1) {
            return commentsCount + " comment";
        }
        return commentsCount + " comments";
    }

    _getTime = () => {
        let {timestamp} = this.props.post;
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

    _getSubtext = () => {
        let {post_points, username} = this.props.post;

        return (
            <div>
                <span>{(post_points || 0)  + " points "}</span>
                <span>{"by " + username + " "}</span>
                <span>{this._getTime()}</span>
                <span>{" | hide | "}</span>
                <Link to="/item" onClick={this.onCommentClick}>
                    {this.getCommentsAmount()}
                </Link>
            </div>
        )
    }

    _getPosts = () => {
        PostActions.getPostsBySite(this._getDomain());
    }

    render() {
        let {post, index} = this.props;

        return (
            <div className="post">
                <div className="title">
                    {index ?
                        <span className="title-text count">{index + ". "}</span>
                    :
                        null
                    }
                    <span className="title-text">&#9650;&nbsp;</span>
                    <a href={post.post_url}>{post.post_title || ''}</a>
                    <span className="title-text">&nbsp;(</span>
                    <span className="title-text domain" onClick={this._getPosts}>{this._getDomain()}</span>
                    <span className="title-text">)</span>
                </div>
                <div className="subtext">{this._getSubtext()}</div>
            </div>
        );
    }
};

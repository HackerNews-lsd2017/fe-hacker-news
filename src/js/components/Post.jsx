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

    _getSubtext = () => {
        let {post_points, username, post_time} = this.props.post;

        return (
            <div>
                <span>{(post_points || 0)  + " points "}</span>
                <span>{"by " + username + " "}</span>
                <span>{post_time + " hours ago "}</span>
                <span>{" | hide | "}</span>
                <Link to="/item"
                onClick={this.onCommentClick}>
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

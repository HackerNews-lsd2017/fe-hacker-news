import React from 'react';
import PropTypes from 'prop-types';
import parseDomain from 'parse-domain';
import Actions from '../actions/PostActionCreators';

export default class extends React.Component {
    static propTypes = {
        data: PropTypes.object,
        index: PropTypes.number
    }

    _getDomain = () => {
        let url = this.props.data.post_url;

        if (parseDomain(url)) {
            return parseDomain(url).domain + "." + parseDomain(url).tld;
        } else {
            return '--';
        }
    }

    _getSubtext = () => {
        let {post_points, username, post_time, post_comments} = this.props.data;

        return (
            <div>
                <span>{(post_points || 0)  + " points "}</span>
                <span>{"by " + username + " "}</span>
                <span>{post_time + " hours ago "}</span>
                <span>{" | hide | "}</span>
                <span>{(post_comments || 0) + " comments"}</span>
            </div>
        )
    }

    _getPosts = () => {
        Actions.getPostsBySite(this._getDomain());
    }

    render() {
        let {data, index} = this.props;

        return (
            <div className="post">
                <div className="title">
                    <span className="title-text count">{index + ". "}</span>
                    <span className="title-text">&#9650;&nbsp;</span>
                    <a href={data.post_url}>{data.post_title || ''}</a>
                    <span className="title-text">&nbsp;(</span>
                    <span className="title-text domain" onClick={this._getPosts}>{this._getDomain()}</span>
                    <span className="title-text">)</span>
                </div>
                <div className="subtext">{this._getSubtext()}</div>
            </div>
        );
    }
};

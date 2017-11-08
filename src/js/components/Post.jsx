import React from 'react';
import PropTypes from 'prop-types';
import parseDomain from 'parse-domain';

export default class extends React.Component {
    static propTypes = {
        data: PropTypes.object,
        index: PropTypes.number
    }

    _getDomain = () => {
        let url = this.props.data.post_url;

        if (parseDomain(url)) {
            return " (" + parseDomain(url).domain + "." + parseDomain(url).tld + ")";
        } else {
            return '';
        }
    }

    _getSubtext = () => {
        let {data} = this.props;

        return data.post_points + " " +
            "by " + data.username + " " +
            data.post_time + " hours ago " +
            " | hide | " +
            data.post_comments + " comments"
    }

    render() {
        let {data, index} = this.props;

        return (
            <div className="story-container">
                <div className="title">
                    <span className="subtext count">{index + ". "}</span>
                    <span className="subtext">&#9650;&nbsp;</span>
                    <a href={data.post_url}>{data.post_title ? data.post_title : ''}</a>
                    <span className="subtext domain">{this._getDomain()}</span>
                </div>
                <div className="subtext">{this._getSubtext()}</div>
            </div>
        );
    }
};

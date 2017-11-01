import React, {PropTypes} from 'react';
import parseDomain from 'parse-domain';

export default class extends React.Component {
    static propTypes = {
        data: PropTypes.object,
        index: PropTypes.number
    }

    _getDomain = (domain) => {
        return parseDomain(domain).domain;
    }
    
    _getTld = (domain) => {
        return parseDomain(domain).tld;
    }

    render() {
        let {data, index} = this.props;

        return (
            <div className="story-container">
                <div className="title">
                    <span>{index + ". "}</span>
                    <a href={data.post_url}>{data.post_title}</a>
                    <span>
                        {" (" + this._getDomain(data.post_url) + "." +
                        this._getTld(data.post_url) + ")"}
                    </span>
                </div>
                <div className="substext">
                    {data.post_points + " " +
                    "by " +
                    data.username + " " +
                    data.post_time + " hours ago" +
                    " | hide | " +
                    data.post_comments + " comments"}
                </div>
            </div>
        );
    }
};

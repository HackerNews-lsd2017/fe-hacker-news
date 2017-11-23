import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

export default class extends React.Component {
    static propTypes = {
        comment: PropTypes.array,
    }

    defaultProps = {
        comments: {}
    }

    render() {
        let {comment} = this.props;
        console.log("comment", comment);
        return (
            <div className="comment">
                <div className="comment-header">
                    {comment.username} [-]
                </div>
                <div className="comment-content">
                    {comment.post_text}
                </div>
                <div className="comment-footer">
                <Link to="">reply</Link>
                </div>
            </div>
        );
    }
};

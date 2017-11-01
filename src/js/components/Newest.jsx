import React from 'react';
import PropTypes from 'prop-types';
import Post from './Post';

export default class extends React.Component {
    static propTypes = {
        posts: PropTypes.array,
    }

    render() {
        let {posts} = this.props;

        return (
            <div className="newest-container">
                {posts.map((post, index) =>
                    <Post key={index} index={index + 1} data={post} />
                )}
            </div>
        );
    }
};

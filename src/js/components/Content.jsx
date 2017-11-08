import React from 'react';
import PropTypes from 'prop-types';
import Newest from './Newest';

export default class extends React.Component {
    static propTypes = {
        posts: PropTypes.array,
        loadPosts: PropTypes.func
    }

    render() {
        let {posts, loadPosts} = this.props;

        return (
            <div className="app-content">
                <div className="newest-posts">
                    {posts.length > 0 ?
                        <Newest posts={posts} />
                    : null}
                </div>

                <div className="app-footer">
                    <button onClick={loadPosts}>More</button>
                </div>
            </div>
        );
    }
};

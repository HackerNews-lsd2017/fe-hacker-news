import React from 'react';
import Comment from './Comment';
import Post from './Post';
import AuthStore from '../stores/AuthStore';
import PostStore from '../stores/PostStore';
import PostActions from '../actions/PostActionCreators';

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
        let {id} = this.props.match.params;
        if (id) {
            PostActions.getComments(id);
        }
    }

    onChange = () => {
        this.setState({
            newComment: PostStore.getComment(),
            comments: PostStore.getComments(),
            post: PostStore.getPost()
        });
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

    renderChildren(parentComment) {
        let {comments} = this.state;
        let children = comments.filter(comment => parentComment.hanesst_id === comment.post_parent);

        if (children.length === 0) {
            return false;
        }

        return children.map(comment =>
            <div key={comment.hanesst_id} className="child-comment">
                <Comment comment={comment} />
                {this.renderChildren(comment)}
            </div>
        );
    }

    render() {
        let {post, comments, newComment} = this.state;
        let topLevelComments = comments.filter(comment => post.hanesst_id === comment.post_parent);
        console.log("state post", post);
        return (
            <div className="comment-container">
                {post ? 
                    <div className="story-container">
                        <Post post={post} />
                        <div className="comment-area">
                            <textArea value={newComment} onChange={this.onCommentChange}/>
                            <button onClick={this.addComment}>
                                add comment
                            </button>
                        </div>
                    </div>
                :
                    null
                }
                {comments.length < 1 ?
                        null
                    :
                    <ul>
                        {topLevelComments.map(parentComment =>
                            <li key={parentComment.hanesst_id}>
                                <Comment
                                className="comment"
                                comment={parentComment} />
                                {this.renderChildren(parentComment)}
                            </li>
                        )}
                    </ul>
                }
            </div>
        );
    }
};

  

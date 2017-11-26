import React from 'react';
import Comment from './Comment';
import Post from './Post';
import AuthStore from '../stores/AuthStore';
import PostStore from '../stores/PostStore';
import PostActions from '../actions/PostActionCreators';

export default class extends React.Component {
    state = {
        comment: "",
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
        let viewedPost = PostStore.getPost();

        PostActions.getComments(viewedPost.hanesst_id);
    }

    onChange = () => {
        this.setState({
            comment: PostStore.getComment(),
            comments: PostStore.getComments(),
            post: PostStore.getPost()
        });
    }

    addComment = () => {
        let {comment, post} = this.state;

        let postTemplate = {
            post_title: "",
            post_text: comment, 
            hanesst_id: 0, 
            post_type: "comment", 
            post_parent: post.hanesst_id,
            username: AuthStore.getUser().username,
            pwd_hash: "fyQgkcLMD1", 
            post_url: ""
        }
        console.log("add comment", postTemplate);
        // PostActions.submitPost();
    }

    onCommentChange = (event) => {
        let {target} = event;

        PostActions.updateComment(target.value);
    }

    render() {
        let {post, comments, comment} = this.state;

        return (
            <div className="comment-container">
                {post ? 
                    <div className="story-container">
                        <Post post={post}/>
                        <div className="comment-area">
                            <textArea value={comment} onChange={this.onCommentChange}/>
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
                        comments.map(comment => 
                            <Comment comment={comment}/>
                        )
                }
            </div>
        );
    }
};

  

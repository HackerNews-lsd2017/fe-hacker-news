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
        post: PostStore.getPost(),
        authenticated: AuthStore.getAuth(),
        upVotes: PostStore.getPostsKarma()
    }

    componentDidMount = () => {
        this.loadData();
        PostActions.fetchKarma();
        AuthStore.addChangeListener(this.onChange);
        PostStore.addChangeListener(this.onChange);
    }

    componentWillUnmount = () => {
        AuthStore.removeChangeListener(this.onChange);
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
            post: PostStore.getPost(),
            authenticated: AuthStore.getAuth(),
            upVotes: PostStore.getPostsKarma()
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

    checkUpVote = (hanesst_id) => {
        let {upVotes} = this.state;
        let id = hanesst_id.toString();
        
        if(upVotes.posts && upVotes.posts[id]) {
            return true;
        }
        return false;
    }

    upVote = (hanesst_id) => {
        PostActions.upVote(hanesst_id);
    }

    renderChildren(parentComment) {
        let {comments, authenticated} = this.state;
        let children = comments.filter(comment => parentComment.hanesst_id === comment.post_parent);

        if (children.length === 0) {
            return false;
        }

        return children.map(comment =>
            <div key={comment.hanesst_id} className="child-comment">
                <Comment comment={comment}
                authenticated={authenticated}
                upVoted={this.checkUpVote(comment.hanesst_id)}
                upVote={this.upVote.bind(null, comment.hanesst_id)} />
                {this.renderChildren(comment)}
            </div>
        );
    }

    render() {
        let {post, comments, newComment, authenticated} = this.state;
        let topLevelComments = comments.filter(comment => post.hanesst_id === comment.post_parent);
        return (
            <div className="comment-container">
                {post.hanesst_id ? 
                    <div className="story-container">
                        <Post post={post}
                        upVoted={this.checkUpVote(post.hanesst_id)}
                        upVote={this.upVote.bind(null, post.hanesst_id)}
                        />
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
                                authenticated={authenticated}
                                comment={parentComment}
                                upVoted={this.checkUpVote(parentComment.hanesst_id)}
                                upVote={this.upVote.bind(null, parentComment.hanesst_id)}
                                />
                                {this.renderChildren(parentComment)}
                            </li>
                        )}
                    </ul>
                }
            </div>
        );
    }
};

  

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPost, deletePost } from '../actions';
import { Link } from 'react-router-dom';

class PostsShow extends Component {
    componentDidMount() {
        const { id } = this.props.match.params;
        this.props.fetchPost(id);
    }

    onDeletePost() {
        const { id } = this.props.match.params;
        this.props.deletePost(id, () => {
            this.props.history.push('/');
        });
    }

    render() {
        const { post } = this.props;
        if (!post) {
            return <div>Loading ...</div>;
        }

        return (
            <div className="mt-10">
                <div className="row">
                    <Link to="/" className="btn btn-secondary">Back To Index</Link>
                    <button className="btn btn-danger pull-xs-right" onClick={this.onDeletePost.bind(this)}>Delete</button>
                </div>
                <hr />
                <div className="row">
                    <h3>{post.title}</h3>
                    <h6>Categories: {post.categories}</h6>
                    <p>{post.content}</p>
                </div>
            </div>
        );
    }
}

function mapStateToProps({ posts }, ownProps) {
    return { post: posts ? posts[ownProps.match.params.id] : null };
}

export default connect(mapStateToProps, { fetchPost, deletePost })(PostsShow);
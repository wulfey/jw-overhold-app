import React, { Component } from "react";
import { connect } from "react-redux";
// import {bindActionCreators} from 'redux';
import { getPost, deletePost } from "../actions/index";
// import _ from 'lodash';
import { Link } from "react-router-dom";

class PostShow extends Component {
  // this is a special function for React
  // this is a lifecycle function called on instantiation
  componentDidMount() {
    // params is magic.
    // params is everythign in:  /posts/:id/:commendId
    // params has :id, id here needs to match that :id in routes

    // console.log("inside componentDidMOunt, hereis id:");

    // ES6
    // const {id} = this.props.match.params

    const id = this.props.match.params.id;
    // console.log(id);
    this.props.getPost(id);
  }

  renderPost(post) {
    // console.log("In post SHOW");
    // console.log(post);

    // component will mount is slow, it always queries first
    if (!post) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        <h3>{post.title}</h3>
        <h6>Categories: {post.categories}</h6>
        <p>Content: {post.content}</p>
      </div>
    );
  }

  onDeleteClick() {
    const id = this.props.match.params.id;
    this.props.deletePost(id, () => {
      this.props.history.push("/posts");
    });
  }

  render() {
    const post = this.props.post;
    // console.log("inside render, this is post:");
    // console.log(post);
    if (!post) {
      return <div>Loading...</div>;
    }
    return (
      <div>
        <div className="text-xs-right" />
        <h1>Show a Post</h1>
        {this.renderPost(post)}
        <Link className="btn btn-success" to="/posts/new">
          Add a Post
        </Link>
        <Link className="btn btn-primary" to="/posts">
          Posts Index
        </Link>
        <button
          className="btn btn-danger"
          onClick={this.onDeleteClick.bind(this)}
        >
          Delete Post
        </button>
      </div>
    );
  }
}

// export default PostsIndex;

// map state to props ...
function mapStateToProps({ posts }, ownProps) {
  return { post: posts[ownProps.match.params.id] };
}

// function mapDispatchToProps(dispatch){
// stuffing {fetchPosts} in there ES6 style is easier
// this skips needing the mapDispatchToProps
export default connect(mapStateToProps, { getPost, deletePost })(PostShow);

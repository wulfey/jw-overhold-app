import React, { Component } from "react";
import { connect } from "react-redux";
// import {bindActionCreators} from 'redux';
import { fetchPosts } from "../actions/index";
import _ from "lodash";
import { Link } from "react-router-dom";

class PostsIndex extends Component {
  // this is a special function for React
  // this is a lifecycle function called on instantiation
  componentDidMount() {
    this.props.fetchPosts();
  }
  renderPosts() {
    // console.log("In renderposts");
    // console.log(this.props.posts);
    return _.map(this.props.posts, post => {
      // console.log(post);
      return (
        <div key={post.id}>
          <li className="list-group-item">
            <Link className="btn btn-primary" to={`/posts/${post.id}`}>
              Show Post {post.id}
            </Link>
            {post.title}
          </li>
        </div>
      );
    });
  }

  render() {
    return (
      <div>
        <h1>POSTS Index</h1>
        <ul className="list-group">{this.renderPosts()}</ul>
        <div className="text-xs-left">
          <Link className="btn btn-primary" to="/posts/new">
            Add a Post
          </Link>
        </div>
      </div>
    );
  }
}

// export default PostsIndex;

// map state to props ...
function mapStateToProps(state) {
  return { posts: state.posts };
}

// function mapDispatchToProps(dispatch){
// stuffing {fetchPosts} in there ES6 style is easier
// this skips needing the mapDispatchToProps
export default connect(mapStateToProps, { fetchPosts })(PostsIndex);

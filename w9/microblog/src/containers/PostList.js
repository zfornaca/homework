import React, { Component } from 'react';
import uuid from 'uuid/v1';
import Post from '../components/Post';
import { connect } from 'react-redux';

class PostList extends Component {
  handleDelete = id => {
    this.props.dispatch({ type: 'DELETE_POST', id });
  };
  render() {
    const posts = this.props.posts.map(post => (
      <Post
        title={post.title}
        body={post.body}
        deletePost={() => this.handleDelete(post.id)}
        key={uuid()}
      />
    ));
    return (
      <div>
        <ul>{posts}</ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { posts: state.posts };
}

export default connect(mapStateToProps)(PostList);

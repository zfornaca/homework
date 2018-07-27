import React, { Component } from 'react';
import uuid from 'uuid/v1';
import Post from '../components/Post';
import { connect } from 'react-redux';
import EditablePost from '../components/EditablePost';

class PostList extends Component {
  handleDelete = id => {
    this.props.dispatch({ type: 'DELETE_POST', id });
  };

  handleToggle = id => {
    this.props.dispatch({ type: 'TOGGLE_EDITING', id });
  };

  handleUpdate = (id, title, body) => {
    this.props.dispatch({ type: 'UPDATE_POST', title, body, id });
  };

  render() {
    const posts = this.props.posts.map(
      post =>
        !post.isEditing ? (
          <Post
            title={post.title}
            body={post.body}
            toggleEdit={() => this.handleToggle(post.id)}
            deletePost={() => this.handleDelete(post.id)}
            key={uuid()}
          />
        ) : (
          <EditablePost
            title={post.title}
            body={post.body}
            updatePost={(newTitle, newBody) =>
              this.handleUpdate(post.id, newTitle, newBody)
            }
            key={uuid()}
          />
        )
    );
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

import React, { Component } from 'react';
import Title from '../components/Post';
import uuid from 'uuid/v1';
import { connect } from 'react-redux';

class TitleList extends Component {
  handleDelete = id => {
    this.props.dispatch({ type: 'DELETE_POST', id });
  };
  render() {
    const titles = this.props.posts.map(post => (
      <Title
        title={post.title}
        deletePost={() => this.handleDelete(post.id)}
        key={uuid()}
      />
    ));
    return (
      <div>
        <h1>Titles</h1>
        <ul>{titles}</ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { posts: state.posts };
}

export default connect(mapStateToProps)(TitleList);

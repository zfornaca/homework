import React, { Component } from 'react';

export default class Post extends Component {
  render() {
    return (
      <li>
        <h3>{this.props.title}</h3>
        <p>{this.props.body}</p>
        <button onClick={this.props.toggleEdit}>Edit</button>
        <button onClick={this.props.deletePost}>X</button>
      </li>
    );
  }
}

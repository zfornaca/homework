import React, { Component } from 'react';

export default class Title extends Component {
  render() {
    return (
      <li>
        <h3>{this.props.title}</h3>
        <button onClick={this.props.deletePost}>X</button>
      </li>
    );
  }
}

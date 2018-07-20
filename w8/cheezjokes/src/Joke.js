import React, { Component } from 'react';

class Joke extends Component {
  render() {
    return (
      <li className="Joke">
        <button onClick={this.props.upvote}>Yay!</button>
        {this.props.text}
        <button onClick={this.props.downvote}>Boo!</button>
      </li>
    );
  }
}

export default Joke;

import React, { Component } from 'react';

export default class EditablePost extends Component {
  state = { title: this.props.title, body: this.props.body };

  handleTitleChange = evt => {
    this.setState({ title: evt.target.value });
  };
  handleBodyChange = evt => {
    this.setState({ body: evt.target.value });
  };

  submitUpdate = evt => {
    evt.preventDefault();
    this.props.updatePost(this.state.title, this.state.body);
  };

  render() {
    return (
      <li>
        <form onSubmit={this.submitUpdate}>
          <input
            type="text"
            id="title"
            onChange={this.handleTitleChange}
            value={this.state.title}
          />
          <input
            type="text"
            id="body"
            onChange={this.handleBodyChange}
            value={this.state.body}
          />
          <button>Save</button>
        </form>
      </li>
    );
  }
}

// initial state should match current title and body, which are both passed down as props

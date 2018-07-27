import React, { Component } from 'react';
import { connect } from 'react-redux';

class NewPostForm extends Component {
  state = { title: '', body: '', errorMessage: '' };

  handleSubmit = evt => {
    evt.preventDefault();
    // check if valid
    if (this.state.title && this.state.body) {
      this.props.dispatch({
        type: 'ADD_POST',
        title: this.state.title,
        body: this.state.body
      });
      this.setState({ title: '', body: '', errorMessage: '' });
    } else {
      this.setState({ errorMessage: 'Please fill out both fields.' });
    }
  };

  handleTitleChange = evt => {
    this.setState({ title: evt.target.value });
  };
  handleBodyChange = evt => {
    this.setState({ body: evt.target.value });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            onChange={this.handleTitleChange}
            value={this.state.title}
          />
          <label htmlFor="body">Body:</label>
          <input
            type="body"
            id="body"
            onChange={this.handleBodyChange}
            value={this.state.body}
          />
          {this.state.errorMessage ? <p>{this.state.errorMessage}</p> : ''}
          <button>Add</button>
        </form>
      </div>
    );
  }
}

export default connect()(NewPostForm);

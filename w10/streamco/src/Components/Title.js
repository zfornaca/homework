import React, { Component } from 'react';
import './Title.css';

export default class Title extends Component {
  render() {
    return (
      <div className="Title">
        <div className="imageBox">
          <img src={this.props.imgUrl} />
          <h2>{this.props.overlay}</h2>
        </div>
        <p>{this.props.title}</p>
      </div>
    );
  }
}

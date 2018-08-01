import React, { Component } from 'react';
import './Header.css';

export default class Header extends Component {
  render() {
    return (
      <div className="Header">
        <h1>DEMO Streaming</h1>
        <div>
          <h5>Log in</h5>
          <button>Start your free trial</button>
        </div>
      </div>
    );
  }
}

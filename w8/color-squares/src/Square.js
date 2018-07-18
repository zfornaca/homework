import React, { Component } from 'react';
import './Square.css';

const COLORS = [
  'lavender',
  'thistle',
  'plum',
  'violet',
  'orchid',
  'fuchsia',
  'magenta',
  'mediumorchid',
  'mediumpurple',
  'rebeccapurple',
  'blueviolet',
  'darkviolet',
  'darkorchid',
  'darkmagenta',
  'purple',
  'indigo',
  'slateblue',
  'darkslateblue',
  'mediumslateblue',
  'cornflowerblue',
  'dodgerblue',
  'deepskyblue',
  'steelblue',
  'lightsteelblue'
];

class Square extends Component {
  state = { color: this.pickColor() };

  pickColor() {
    let color = COLORS[Math.floor(Math.random() * 24)];
    return color;
  }

  render() {
    return (
      <div
        className="Square"
        onClick={evt => this.setState({ color: this.pickColor() })}
        style={{ backgroundColor: this.state.color }}
      />
    );
  }
}

export default Square;

import React, { Component } from 'react';
import Square from './Square';
import './Board.css';

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      elements: Array.from({ length: props.numSquares })
    };
  }

  static defaultProps = {
    numSquares: 24
  };

  render() {
    return (
      <div className="Board">{this.state.elements.map(el => <Square />)}</div>
    );
  }
}

export default Board;

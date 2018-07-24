import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import './App.css';
import machine from './vending.png';

const Vending = props => {
  return (
    <div>
      <h1 id="vending-hello">Hello. I am a vending machine.</h1>
      <div id="vending">
        <img src={machine} />
        <div id="menu">
          <p>
            <Link to="/soda">How about a soda?</Link>
          </p>
          <p>
            <Link to="/chips">Maybe some chips?</Link>
          </p>
          <p>
            <Link to="/sardines">Or perhaps, uh, sardines?</Link>
          </p>
        </div>
        <img src={machine} />
      </div>
    </div>
  );
};
const Soda = props => {
  return (
    <div id="soda">
      <h1>This is the soda.</h1>
      {/* <img src="https://media.giphy.com/media/7MRLlM8dTSQgM/giphy.gif" /> */}
      <br />
      <h3>
        <Link to="/">Return to vending machine.</Link>
      </h3>
    </div>
  );
};

class Chips extends Component {
  constructor() {
    super();
    this.state = { bags: 1 };
  }

  getBag = () => {
    this.setState({ bags: this.state.bags + 1 });
  };

  render() {
    const bags = [];
    for (let i = 0; i < this.state.bags; i++) {
      bags.push(
        <img
          src="https://images-na.ssl-images-amazon.com/images/I/91M5DIRwhoL._SL1500_.jpg"
          width="100"
        />
      );
    }
    return (
      <div id="chips">
        <h4>
          Are these enough? Shall we{' '}
          <Link to="/"> return to the vending machine?</Link>
        </h4>
        <br />
        <button onClick={this.getBag}>No. Need more chips. </button>
        <br />
        <br />

        {bags}
      </div>
    );
  }
}

const Sardines = props => {
  return (
    <div id="sardines">
      <h1>It&#39;s me.</h1>
      <img src="https://3.bp.blogspot.com/--kbwplZnmo0/UJyiuaxp3MI/AAAAAAAABKs/cLZfXqtWvEs/s640/Crowded+Train_crop.JPG" />
      <h1>I&#39;m the sardine.</h1>
      <Link to="/">Return to vending machine.</Link>
    </div>
  );
};

class App extends Component {
  render() {
    return (
      <div>
        <Route exact path="/" component={Vending} />
        <Route exact path="/soda" component={Soda} />
        <Route exact path="/chips" component={Chips} />
        <Route exact path="/sardines" component={Sardines} />
      </div>
    );
  }
}

export default App;

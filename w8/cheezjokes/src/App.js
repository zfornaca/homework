import React, { Component } from 'react';
import JokeList from './JokeList';
import axios from 'axios';

class App extends Component {
  state = { jokes: [], message: `Awaiting wisdom of dad.` };

  async componentDidMount() {
    try {
      const twentyJokes = [];
      for (let i = 0; i < 20; i++) {
        const response = await axios.get('https://icanhazdadjoke.com/', {
          headers: { Accept: 'application/json' }
        });
        twentyJokes.push({
          text: response.data.joke,
          yay: 0,
          boo: 0,
          id: response.data.id
        });
      }
      this.setState({ jokes: twentyJokes, message: '' });
    } catch (e) {
      this.setState({ message: `Dad went out for cigarettes.` });
    }
  }

  getNewJokes = async () => {
    try {
      this.setState({ message: `Awaiting wisdom of dad.` });
      const twentyJokes = [];
      for (let i = 0; i < 20; i++) {
        const response = await axios.get('https://icanhazdadjoke.com/', {
          headers: { Accept: 'application/json' }
        });
        twentyJokes.push({
          text: response.data.joke,
          yay: 0,
          boo: 0,
          id: response.data.id
        });
      }
      this.setState({ jokes: twentyJokes, message: '' });
    } catch (e) {
      this.setState({ message: `Dad went out for cigarettes.` });
    }
  };

  handleUpvote = id => {
    const updatedJokes = this.state.jokes.map(joke => {
      if (joke.id === id) {
        return { ...joke, yay: joke.yay++ };
      }
      return joke;
    });
  };

  render() {
    if (this.state.message.length === 0) {
      return (
        <div className="App">
          <JokeList jokes={this.state.jokes} />
          <button onClick={this.getNewJokes}>Get new jokes!</button>
        </div>
      );
    } else {
      return <div>{this.state.message}</div>;
    }
  }
}

export default App;

import React, { Component } from 'react';
import PostList from '../containers/PostList';
import NewPostForm from '../containers/NewPostForm';
import TitleList from '../containers/TitleList';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <PostList />
        <NewPostForm />
        <TitleList />
      </div>
    );
  }
}

export default App;

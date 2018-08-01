import React, { Component } from 'react';
import './App.css';
import Header from './Containers/Header';
import Content from './Containers/Content';
import Footer from './Containers/Footer';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Content />
        <Footer />
      </div>
    );
  }
}

export default App;

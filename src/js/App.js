import React, { Component } from 'react';
import logo from '../img/logo.png';
import '../styles/App.css';
import image1 from '../img/image1.jpg'

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Hacker Wubadubadubdub News</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <img src={image1} className="Main-image" alt="image1"/>
      </div>
    );
  }
}

export default App;

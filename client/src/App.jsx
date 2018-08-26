import React, { Component } from 'react';

import Navbar from './Navbar.jsx';
import Main from './Main.jsx';
import './App.css';

class App extends Component {
  // RENDERING
  render() {
    return (
      <div className="App">
        <Navbar />
        <Main />
      </div>
    );
  }
}

export default App;

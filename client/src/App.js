import React, { Component } from 'react';

import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

//          Adopt and Events
import Navbar from './Navbar.jsx';
import './App.css';

class App extends React.Component {
  //       //              RENDERING
  render() {
    return (
      <div className="App">
        <Navbar />
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';

import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'


//          Adopt and Events
import Navbar from './Navbar.jsx'
import './App.css';


class App extends Component {

  componentDidMount() {
  //code I added in will link to server
  }


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

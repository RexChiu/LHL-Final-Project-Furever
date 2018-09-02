import React, { Component } from 'react';

import Navbar from './Navbar.jsx';
import Main from './Main.jsx';
import './assets/App.css';

class App extends Component {
  // RENDERING
  render() {
    return (
      <React.Fragment>
        <Navbar />
        <div className="App">
          <Main />
        </div>
      </React.Fragment>
    );
  }
}

export default App;

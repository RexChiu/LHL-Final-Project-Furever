import React, { Component } from 'react';

import Navbar from './componets/Navbar/Navbar';
import Main from './componets/Main';
import './assets/styles/App.scss';

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

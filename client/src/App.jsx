import React, { Component } from 'react';

import Navbar from './Navbar.jsx';
import Main from './Main.jsx';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: ''
    };
  }

  setUserId = userId => {
    this.setState(userId);
  };

  // RENDERING
  render() {
    return (
      <React.Fragment>
        <Navbar />
        <div className="App">
          <Main setUserId={this.setUserId} userId={this.state.userId} />
        </div>
      </React.Fragment>
    );
  }
}

export default App;

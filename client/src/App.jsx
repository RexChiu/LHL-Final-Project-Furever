import React, { Component } from 'react';

import Navbar from './componets/Navbar/Navbar';
import Footer from './componets/Footer/Footer';
import Main from './componets/Main';
import './assets/styles/App.scss';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showClippy: false,
      clippyText: ''
    };
  }
  // RENDERING
  render() {
    return (
      <React.Fragment>
        <Navbar />
        <div className="App">
          <Main />
        </div>
        <Footer show={this.state.showClippy} text={this.state.clippyText} />
      </React.Fragment>
    );
  }
}

export default App;

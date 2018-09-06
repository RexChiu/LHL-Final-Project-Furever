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
      clippyTextkey: 'empty',
      message: ''
    };
  }

  render() {
    return (
      <React.Fragment>
        <Navbar />
        <div className="App">
          <Main showClippy={this.showClippy} />
        </div>
        <Footer showClippy={this.showClippy} show={this.state.showClippy} textKey={this.state.clippyTextkey} message={this.state.message} />
      </React.Fragment>
    );
  }

  // function that is passed down to almost all components, enables clippy with a message
  showClippy = (toggle, key, message) => {
    if (this.state.clippyTextkey !== key) {
      this.setState({ showClippy: toggle, clippyTextkey: key, message });
    }
  };
}

export default App;

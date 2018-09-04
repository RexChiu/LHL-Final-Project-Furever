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
      clippyTextkey: 'empty'
    };
  }

  render() {
    return (
      <React.Fragment>
        <Navbar />
        <div className="App">
          <Main showClippy={this.showClippy} />
        </div>
        <Footer show={this.state.showClippy} text={this.state.clippyTextkey} />
      </React.Fragment>
    );
  }

  // function that is passed down to almost all components, enables clippy with a message
  showClippy = (toggle, key) => {
    console.log('Comparing: ' + this.state.clippyTextkey, key);
    if (this.state.clippyTextkey !== key) {
      this.setState({ showClippy: toggle, clippyTextkey: key });
    }
  };
}

export default App;

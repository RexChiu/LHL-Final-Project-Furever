import React, { Component } from 'react';

// component contains just the image of clippy
// done because clippy tooltip requires a component as target
class Clippy extends Component {
  render() {
    return (
      <div className="navbar-right">
        <img className="clippy" src={require('../../assets/moe_01.gif')} height="150px" width="150px" alt="clippy" onClick={this.hideClippy} />
      </div>
    );
  }

  hideClippy = () => {
    this.props.showClippy(false, 'empty');
  };
}

export default Clippy;

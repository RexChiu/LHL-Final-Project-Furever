import React, { Component } from 'react';

class Clippy extends Component {
  render() {
    return (
      <div className="navbar-right">
        <img className="clippy" src={require('../../assets/moe_01.gif')} height="150px" width="150px" alt="clippy" />
      </div>
    );
  }
}

export default Clippy;

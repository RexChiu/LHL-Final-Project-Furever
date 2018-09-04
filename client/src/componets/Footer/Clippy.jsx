import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Tooltip, Overlay } from 'react-bootstrap';

class Clippy extends Component {
  render() {
    return (
      <div className="navbar-right">
        <img className="clippy" src={require('../../assets/moe_00.png')} height="150px" width="150px" alt="clippy" />
      </div>
    );
  }
}

export default Clippy;

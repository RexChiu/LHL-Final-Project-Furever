import React, { Component } from 'react';

import { Link } from 'react-router-dom';

class Navbar extends Component {
  logoutUser = () => {
    sessionStorage.clear();
  };
  render() {
    return (
      <div className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand">
          <Link to="/">Home</Link>
        </a>
        <a className="nav-item">
          <Link to="/events">Events</Link>
        </a>
        <a className="nav-item">
          <Link to="/adopt">Adopt</Link>
        </a>
        <a className="nav-items" onClick={this.logoutUser}>
          Logout
        </a>
        <hr />
      </div>
    );
  }
}

export default Navbar;

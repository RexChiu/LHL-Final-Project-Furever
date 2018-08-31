import React, { Component, Fragment } from 'react';

import { Link } from 'react-router-dom';

class Navbar extends Component {
  logoutUser = () => {
    sessionStorage.clear();
  };

  loggedInUser = () => {
    if (sessionStorage.getItem('userId')) {
      return (
        <Fragment>
          <span>Logged in as {sessionStorage.getItem('username')}</span>
          <a className="nav-item" onClick={this.logoutUser}>
            <Link to="/">Logout</Link>
          </a>
        </Fragment>
      );
    }
  };

  render() {
    return (
      <div className="navbar navbar-light">
        <a className="navbar-brand">
          <Link to="/">Home</Link>
        </a>
        <a id="navfix" className="nav-item">
          <Link to="/events">Events</Link>
        </a>
        <a id="navfix" className="nav-item">
          <Link to="/adopt">Adopt </Link>
        </a>
        <a id="navfix" className="nav-item">
          <Link to="/nearby"> Nearby </Link>
        </a>
        <a id="navfix" className="nav-item">
          <Link to="/care">Care</Link>
        </a>
        {this.loggedInUser()}
        <hr />
      </div>
    );
  }
}

export default Navbar;

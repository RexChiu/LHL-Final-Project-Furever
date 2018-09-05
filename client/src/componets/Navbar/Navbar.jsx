import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';

class Navbar extends Component {
  render() {
    return (
      <Fragment>
        <ul className="nav nav-justified nav-tabs navbar-fixed-top">
          <li id="home-tab" role="presentation">
            <Link to="/">Home</Link>
          </li>
          <li role="presentation">
            <Link to="/adopt">Adopt</Link>
          </li>
          {this.loggedInUser()}
        </ul>
      </Fragment>
    );
  }

  logoutUser = () => {
    sessionStorage.clear();
    window.location.reload();
  };

  hasPetUser = () => {
    if (sessionStorage.getItem('adopted') === 'true') {
      return (
        <Fragment>
          <li role="presentation">
            <Link to="/care">Care</Link>
          </li>
          <li role="presentation">
            <Link to="/nearby"> Nearby</Link>
          </li>
          <li role="presentation">
            <Link to="/events">Events</Link>
          </li>
        </Fragment>
      );
    }
  };

  loggedInUser = () => {
    if (sessionStorage.getItem('userId')) {
      return (
        <Fragment>
          {this.hasPetUser()}
          <li role="presentation" className="nav-right disabled">
            <a className="">Logged in as {sessionStorage.getItem('username')}</a>
          </li>

          <li role="presentation" className="nav-right" onClick={this.logoutUser}>
            <Link to="/">Logout</Link>
          </li>
        </Fragment>
      );
    }
  };
}

export default Navbar;

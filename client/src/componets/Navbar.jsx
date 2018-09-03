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
          <li role="presentation" className="nav-right disabled">
            <a className="">Logged in as {sessionStorage.getItem('username')}</a>
          </li>

          <li role="presentation" className="nav-right" onClick={this.logoutUser}>
            <a>
              <Link to="/">Logout</Link>
            </a>
          </li>
        </Fragment>
      );
    }
  };

  render() {
    return (
      <Fragment>
        <ul className="nav nav-justified nav-tabs navbar-fixed-top">
          <li id="home-tab" role="presentation">
            <a>
              <Link to="/">Home</Link>
            </a>
          </li>
          <li role="presentation">
            <a>
              <Link to="/adopt">Adopt </Link>
            </a>
          </li>
          <li role="presentation">
            <a>
              <Link to="/events">Events</Link>
            </a>
          </li>
          <li role="presentation">
            <a>
              <Link to="/nearby"> Nearby</Link>
            </a>
          </li>
          <li role="presentation">
            <a>
              <Link to="/care">Care</Link>
            </a>
          </li>
          {this.loggedInUser()}
        </ul>
      </Fragment>
    );
  }
}

export default Navbar;

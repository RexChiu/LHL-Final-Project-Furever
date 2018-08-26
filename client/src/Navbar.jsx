import React, { Component } from 'react';

import { Link } from 'react-router-dom';

class Navbar extends Component {
  render() {
    return (
      <div className="nav navbar-expand-lg">
        <a className="nav-link">
          <Link to="/">Home</Link>
        </a>
        <a className="nav-link">
          <Link to="/events">Events</Link>
        </a>
        <a className="nav-link">
          <Link to="/adopt">Adopt</Link>
        </a>
        <hr />
      </div>
    );
  }
}

export default Navbar;

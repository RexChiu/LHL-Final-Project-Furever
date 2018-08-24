import React, { Component } from 'react';

import Adopt from './Adopt.jsx';
import Events from './Events.jsx';
import Home from './Home.jsx';

import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

class Navbar extends Component {
  render() {
    return (
      <Router>
        <div>
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
          </div>

          <hr />
          <Route exact path="/" component={Home} />
          <Route path="/events" component={Events} />
          <Route path="/adopt" component={Adopt} />
        </div>
      </Router>
    );
  }
}

export default Navbar;

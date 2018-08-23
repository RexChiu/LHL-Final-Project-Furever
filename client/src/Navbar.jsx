import React, { Component } from 'react';

import Adopt from './Adopt.jsx'
import Events from './Events.jsx'
import Home from './Home.jsx'

import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

class Navbar extends Component {

  render() {
    return (
      <Router>
        <div>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/events">Events</Link></li>
            <li><Link to="/adopt">Adopt</Link></li>
          </ul>

          <hr/>
          <Route exact path="/" component={Home}/>
          <Route path="/events" component={Events}/>
          <Route path="/adopt" component={Adopt}/>
        </div>
      </Router>
      );
  }
}

export default Navbar;
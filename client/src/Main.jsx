import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

import Adopt from './Adopt.jsx';
import Events from './Events.jsx';
import Home from './Home.jsx';

class Main extends React.Component {
  //       //              RENDERING
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/events" component={Events} />
        <Route path="/adopt" component={Adopt} />
      </Switch>
    );
  }
}

export default Main;

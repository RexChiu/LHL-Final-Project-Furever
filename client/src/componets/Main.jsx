import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Adopt from './Adopt/Adopt';
import Events from './Events/Events';
import Home from './Home/Home';
import Nearby from './Nearby';
import Care from './Care';

class Main extends React.Component {
  //       //              RENDERING
  render() {
    return (
      <Switch>
        <Route exact path="/" render={props => <Home {...props} />} />
        <Route path="/events" render={props => <Events {...props} />} />
        <Route path="/adopt" render={props => <Adopt {...props} id="adopt-page" />} />
        <Route path="/care" render={props => <Care {...props} />} />
        <Route path="/nearby" render={props => <Nearby {...props} />} />
      </Switch>
    );
  }
}

export default Main;

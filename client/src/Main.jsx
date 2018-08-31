import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Adopt from './Adopt.jsx';
import Events from './Events.jsx';
import Home from './Home.jsx';
import Nearby from './Nearby.jsx';
import Care from './Care.jsx';

class Main extends React.Component {
  //       //              RENDERING
  render() {
    return (
      <Switch>
        <Route exact path="/" render={props => <Home {...props} setUserId={this.props.setUserId} />} />
        <Route path="/events" render={props => <Events {...props} />} />
        <Route path="/adopt" render={props => <Adopt {...props} id="adopt-page" />} />
        <Route path="/care" render={props => <Care {...props} />} />
        <Route path="/places" render={props => <Nearby {...props} />} />
      </Switch>
    );
  }
}

export default Main;

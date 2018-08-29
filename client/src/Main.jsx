import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Adopt from './Adopt.jsx';
import Events from './Events.jsx';
import Home from './Home.jsx';
import Care from './Care.jsx';

class Main extends React.Component {
  //       //              RENDERING
  render() {
    return (
      <Switch>
        <Route exact path="/" render={props => <Home {...props} setUserId={this.props.setUserId} />} />
        <Route path="/events" render={props => <Events {...props} />} />
        <Route path="/adopt" render={props => <Adopt {...props} />} />
        <Route path="/care" render={props => <Care {...props} />} />
      </Switch>
    );
  }
}

export default Main;

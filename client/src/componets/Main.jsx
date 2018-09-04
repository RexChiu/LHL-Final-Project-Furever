import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Adopt from './Adopt/Adopt';
import Events from './Events/Events';
import Home from './Home/Home';
import Nearby from './Nearby/Nearby';
import Care from './Care/Care';

class Main extends React.Component {
  render() {
    // weird props format to pass in props through a react-router component
    return (
      <Switch>
        <Route exact path="/" render={props => <Home {...props} showClippy={this.props.showClippy} />} />
        <Route path="/events" render={props => <Events {...props} showClippy={this.props.showClippy} />} />
        <Route path="/adopt" render={props => <Adopt {...props} showClippy={this.props.showClippy} />} />
        <Route path="/care" render={props => <Care {...props} showClippy={this.props.showClippy} />} />
        <Route path="/nearby" render={props => <Nearby {...props} showClippy={this.props.showClippy} />} />
      </Switch>
    );
  }
}

export default Main;

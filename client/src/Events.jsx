import React, { Component } from 'react';
import EventCompose from './EventCompose';
//import assets

class Events extends Component {
  render() {
    return (
      <React.Fragment>
        <EventCompose />
        <p> Events Page </p>
      </React.Fragment>
    );
  }
}

export default Events;

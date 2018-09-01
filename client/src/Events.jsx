import React, { Component } from 'react';
import EventCompose from './EventCompose';
import EventLocalUsers from './EventLocalUsers';

//import assets

class Events extends Component {
  render() {
    return (
      <React.Fragment>
        {/* <EventCompose /> */}
        <EventLocalUsers />
      </React.Fragment>
    );
  }
}

export default Events;

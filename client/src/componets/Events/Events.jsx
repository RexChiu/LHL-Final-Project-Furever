import React, { Component } from 'react';
import EventCompose from './EventCompose';
import EventLocalUsers from './EventLocalUsers';

//import assets

class Events extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eventName: ''
    };
  }
  render() {
    return (
      <React.Fragment>
        <EventCompose eventName={this.state.eventName} />
        <EventLocalUsers setEventName={this.setEventName} />
      </React.Fragment>
    );
  }
  setEventName = eventName => {
    this.setState({ eventName });
  };
}

export default Events;

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
        <img id="eventbg" src={require('../../assets/events_bg3.jpeg')} alt="Girl in a jacket" />

        <div id="eventstitle">
          <p> Community Events </p>
        </div>

        <EventLocalUsers setEventName={this.setEventName} />

        <EventCompose eventName={this.state.eventName} />
      </React.Fragment>
    );
  }
  setEventName = eventName => {
    this.setState({ eventName });
  };
}

export default Events;

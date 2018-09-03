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

    // not logged in, redirect to home page
    if (!sessionStorage.getItem('userId')) {
      alert('Unauthorized Access! Login First!');
      this.props.history.push('/home');
    }
    // does not have a pet, redirect to adopt page
    if (sessionStorage.getItem('adopted') === 'false') {
      alert('Unauthorized Access! Adopt a pet First!');
      this.props.history.push('/adopt');
    }
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

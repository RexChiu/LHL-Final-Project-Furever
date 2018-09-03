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
        <div class="container-fluid">
          <div class="row-fluid">
            <div class="span4">
              <EventLocalUsers setEventName={this.setEventName} />
            </div>
            <div class="span4">
              <EventCompose eventName={this.state.eventName} />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
  setEventName = eventName => {
    this.setState({ eventName });
  };
}

export default Events;

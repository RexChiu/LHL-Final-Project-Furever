import React, { Component } from 'react';
//import assets

class EventCompose extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      events: []
    };
  }

  componentDidMount() {
    //code I added in will link to server
    fetch('http://localhost:8080/events')
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            isLoaded: true,
            events: result.data
          });
        },

        error => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      );
  }
  render() {
    const { events } = this.state;
    let eventItems = '';
    if (events instanceof Array) {
      eventItems = events.map((event, i) => (
        <div>
          {' '}
          <p> {event.id} </p>
          <p> {event.attributes.id} </p>
          <p> {event.attributes.user} </p>
          <p> {event.attributes.title} </p>
          <p> {event.attributes.description} </p>
        </div>
      ));
    }

    return (
      <React.Fragment>
        <div className="panel messagePanel">
          <form id="create" action="/create" method="POST">
            <input id="times-date" type="date" name="date" placeholder="date" />

            <input type="text" id="event_title" name="title" className="form-group" placeholder="What is your event's name?" />
            <input type="text" id="event_location" name="location" className="form-group" placeholder="Where is it?" />
            <textarea className="form-group" id="event_description" name="description" rows="3" placeholder="Event Description" />
            <button id="submit" type="submit">
              {' '}
              Submit{' '}
            </button>
          </form>

          <div />
        </div>
        <div>{eventItems}</div>
      </React.Fragment>
    );
  }
}

export default EventCompose;

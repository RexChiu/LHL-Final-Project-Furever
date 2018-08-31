import React, { Component } from 'react';
const axios = require('axios');
//import assets

class EventCompose extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      events: [],
      title: '',
      location: '',
      description: '',
      date: ''
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
  //          adding handles

  handleChangeTitle = event => {
    this.setState({
      title: event.target.value.trim()
    });
  };

  handleChangeLocation = event => {
    this.setState({
      location: event.target.value.trim()
    });
  };

  handleChangeDescription = event => {
    this.setState({
      description: event.target.value.trim()
    });
  };

  handleChangeDate = event => {
    this.setState({
      date: event.target.value.trim()
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    if (sessionStorage.getItem('userId') === '') {
      alert('Need to Login First!');
      return;
    }

    const reqObj = {
      user: `${sessionStorage.getItem('username')}`,
      userId: `${sessionStorage.getItem('userId')}`,
      title: this.state.title,
      location: this.state.location,
      description: this.state.description,
      date: this.state.date
    };
    console.log('Object', reqObj);
    axios
      .post('http://localhost:8080/events/create', reqObj)
      .then(function(response) {
        console.log('response', response);

        window.location.reload();
      })
      .catch(function(error) {
        console.log(error);
      });
  };
  render() {
    const { events } = this.state;
    let eventItems = '';
    if (events instanceof Array) {
      eventItems = events.map((event, i) => (
        <div>
          {' '}
          <p> {event.id} </p>
          <p> Messageid: {event.attributes.id} </p>
          {/* <p> UserId: {this.state.userId} </p> */}
          <p> date: {event.attributes.date} </p>
          <p> user: {event.attributes.user} </p>
          <p> title: {event.attributes.title} </p>
          <p> description: {event.attributes.description} </p>
          <br />
        </div>
      ));
    }

    return (
      <React.Fragment>
        <div className="panel messagePanel">
          <form id="create">
            {/* <form id="create" action="http://localhost:8080/events/create" method="POST"></form> */}
            <input onChange={this.handleChangeDate} id="times-date" type="date" name="date" placeholder="date" />
            <br />
            <input
              type="text"
              onChange={this.handleChangeTitle}
              id="event_title"
              name="title"
              className="form-group"
              placeholder="What is your event's name?"
            />
            <br />
            <input onChange={this.handleChangeLocation} type="text" id="event_location" name="location" className="form-group" placeholder="Where is it?" />
            <br />
            <textarea
              onChange={this.handleChangeDescription}
              className="form-group"
              id="event_description"
              name="description"
              rows="3"
              placeholder="Event Description"
            />
            <br />
            <button id="submit" type="submit" onClick={this.handleSubmit}>
              Submit
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

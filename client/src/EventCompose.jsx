import React, { Component } from 'react';
import EventComposeFeed from './EventComposeFeed';
const axios = require('axios');
//import assets

class EventCompose extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      events: [],
      title: this.props.eventName,
      location: '',
      description: '',
      date: '',
      going: ''
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

  handleGoing = event => {
    event.preventDefault();
    const goingObj = {
      username: `${sessionStorage.getItem('username')}`,
      userId: `${sessionStorage.getItem('userId')}`,
      eventId: event.target.value.trim()
      // going: []
    };
    console.log(goingObj);

    // return;

    axios
      .post('http://localhost:8080/events/going', goingObj)
      .then(function(response) {
        console.log('response', response);

        // window.location.reload();
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  // labelGoingCount = () => {
  //   if (event.attributes.hasOwnProperty(going) {
  //     return (

  //         <label for="buttonGoing"> {event.attributes.going.length} </label>

  //     );
  //   }
  // };

  //   renderElement(){
  //     if(this.state.value == 'news')
  //        return <Text>data</Text>;
  //     return null;
  //  }

  // <p> {if (!event.attributes.hasOwnProperty('going') == undefined){ }

  // event.attributes.going.length()} </p>

  focus_event_location = () => {
    this.event_location.focus();
  };

  render() {
    const { events } = this.state;

    let eventItems = '';
    if (events instanceof Array) {
      eventItems = events.map((event, i) => <EventComposeFeed event={event} key={event.id} handleGoing={this.handleGoing} />);
    }

    return (
      <React.Fragment>
        <div id="messagePanelCenter">
          <form id="create" className="panel messagePanel">
            <input
              type="text"
              onChange={this.handleChangeTitle}
              id="event_title"
              name="title"
              className="form-group"
              placeholder="What is your event's name?"
              value={this.props.eventName}
            />
            <br />
            <input
              ref={input => {
                this.event_location = input;
              }}
              onChange={this.handleChangeLocation}
              type="text"
              id="event_location"
              name="location"
              className="form-group"
              placeholder="Where is it?"
            />
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
            <input onChange={this.handleChangeDate} id="times-date" type="date" name="date" placeholder="date" />
            <button id="submit" type="submit" onClick={this.handleSubmit}>
              Submit
            </button>
          </form>

          <div />
        </div>
        <div id="eventItemsContainer">
          <div id="eventItems">{eventItems}</div>
        </div>
      </React.Fragment>
    );
  }
}

export default EventCompose;

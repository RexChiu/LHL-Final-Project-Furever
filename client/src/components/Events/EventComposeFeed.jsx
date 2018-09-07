import React, { Component } from 'react';
const axios = require('axios');

//import assets

class EventComposeFeed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: false
    };
  }

  handleGoing = event => {
    // for (var e = 0; e < goingId.length; e++) {
    //   if (goingId[e] === `${sessionStorage.getItem('username')}`) {
    //     console.log('match');
    //   }
    //   // console.log('GOING', goingId[e]);
    //   // console.log(`${sessionStorage.getItem('username')}`);
    // }
    event.preventDefault();
    const goingObj = {
      username: `${sessionStorage.getItem('username')}`,
      userId: `${sessionStorage.getItem('userId')}`,
      eventId: event.target.value.trim()
    };
    // console.log(goingObj);
    // return;
    this.setState({
      clicked: true
    });
    // console.log('AFTER', this.state.clicked);

    axios
      .post('http://localhost:8080/events/going', goingObj)
      .then(function(response) {
        // console.log('response', response);
        window.location.reload();
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  render() {
    //display like count
    var countLikeLength;
    if (this.props.event.attributes.going === undefined || this.props.event.attributes.going === null) {
      countLikeLength = <p> Number of Attendees: 0 </p>;
    } else {
      countLikeLength = <p> Number of Attendees: {this.props.event.attributes.going.length} </p>;
    }

    //created button for going
    var buttonPress;
    //needs if statement so that people without accounts can't go
    if (sessionStorage.getItem('userId')) {
      if (this.state.clicked === false) {
        buttonPress = (
          <button id="buttonGoing" onClick={this.handleGoing} value={this.props.event.attributes.id}>
            {' '}
            going
          </button>
        );
      } else {
        buttonPress = <p>You're Attending</p>;
      }
    }

    var beforeParse = this.props.event.attributes.going;
    let names = [];
    let goingId = [];

    for (var i = 0; i < beforeParse.length; i++) {
      const obj = JSON.parse(beforeParse[i]);
      // console.log(obj.user);
      names.push(obj.user);
      goingId.push(obj.userId);
    }
    let namesOutput = 'Attending Users: ' + names.join(' ');

    // console.log('DID THIS WORK', `${sessionStorage.getItem('userId')}`);

    // check sessions storage

    if (this.state.clicked === false) {
      for (var e = 0; e < goingId.length; e++) {
        if (goingId[e] === `${sessionStorage.getItem('userId')}`) {
          // console.log('match');
          this.setState({
            clicked: true
          });
        }
      }
    }

    return (
      <React.Fragment>
        <div className="panel eventPanel ">
          <div>
            {' '}
            <h3> {this.props.event.attributes.title} </h3>
            <h4> Created By: {this.props.event.attributes.user} </h4>
            <div className="eventDescription">
              <p className="datePanel"> Date: {this.props.event.attributes.date} </p>
              <p> Description: {this.props.event.attributes.description} </p>
            </div>
            {countLikeLength}
            <p> {namesOutput} </p>
            {buttonPress}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default EventComposeFeed;

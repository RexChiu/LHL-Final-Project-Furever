import React, { Component } from 'react';
//import assets
// import Locals from './Locals';
import EventLocals from './EventLocals';

import EventLocalsModal from './EventLocalsModal';

class EventLocalUsers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      users: []
    };
  }

  componentDidMount() {
    // this.props.setEventName('Cats');
    //code I added in will link to server
    fetch('http://localhost:8080/user/withpets')
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            isLoaded: true,
            users: result.data
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

  getRandomInt = max => {
    return Math.floor(Math.random() * Math.floor(max));
  };

  render() {
    const { users } = this.state;
    let userItems = [];

    //Iterate through each element in the user array; then iterate through each
    //users adopted pets to generate a list of ALL adopted pets <except> the logged in user
    if (users instanceof Array) {
      for (let i = 0; i < users.length; i++) {
        for (let j = 0; j < users[i].attributes.pets.length; j++) {
          if (!(users[i].id === sessionStorage.getItem('userId'))) {
            let adoptedPetPhoto = users[i].attributes.pets[j].photos[0];
            let randomkey = this.getRandomInt(100000);
            // console.log('Photo::', users[i].attributes.pets[j].photos[0], '||userid::', users[i].id, '|| key ', randomkey);
            userItems.push(
              <EventLocals
                user={users[i]}
                photo={adoptedPetPhoto}
                randomkey={randomkey}
                key={randomkey * 23}
                setEventName={this.props.setEventName}
                showClippy={this.props.showClippy}
              />
            );
            adoptedPetPhoto = '';
          }
        }
      }
    }

    return (
      <React.Fragment>
        <div className="col-sm-3 col-xs-3 ">
          <div id="eventlocalusers">
            <p id="eventlocal"> Locals Pets: </p>

            <div id="eventlocalcontainer">
              <section>{userItems}</section>
            </div>
            {/* <p id="friendrequest"> Friend Request: </p> */}
            <button id="petTinderButton" className="btn btn-sm btn-block" data-toggle="modal" href="#petLocals">
              {' '}
              Pet Tinder{' '}
            </button>
          </div>
        </div>

        {/* PET MODAL */}
        <div id="petLocals" className="modal fade">
          <EventLocalsModal users={this.state.users} key={this.state.users.id} setEventName={this.props.setEventName} showClippy={this.props.showClippy} />
        </div>
      </React.Fragment>
    );
  }
}
export default EventLocalUsers;

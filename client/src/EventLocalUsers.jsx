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

  render() {
    const { users } = this.state;
    let userItems = [];

    if (users instanceof Array) {
      for (let i = 0; i < users.length; i++) {
        for (let j = 0; j < users[i].attributes.pets.length; j++) {
          let adoptedPet = users[i].attributes.pets[j].photos[0];
          userItems.push(<EventLocals user={users[i]} photo={adoptedPet} key={users[i].id} />);
        }
      }
    }

    return (
      <React.Fragment>
        <section id="eventlocalusers">
          <p id="eventlocal"> Locals: </p>

          <div id="eventlocalcontainer">
            <section>{userItems}</section>
          </div>
          <p id="friendrequest"> Friend Request: </p>
          <button className="btn btn-sm btn-block" data-toggle="modal" href="#petLocals">
            {' '}
            Find{' '}
          </button>
        </section>

        {/* PET MODAL */}
        <div id="petLocals" className="modal fade">
          <EventLocalsModal users={this.state.users} key={this.state.users.id} setEventName={this.props.setEventName} />
        </div>
      </React.Fragment>
    );
  }
}
export default EventLocalUsers;

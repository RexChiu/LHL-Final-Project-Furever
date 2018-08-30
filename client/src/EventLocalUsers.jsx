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
    let userItems = '';
    if (users instanceof Array) {
      userItems = users.map((user, i) => <EventLocals user={user} key={user.id} />);
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
          <EventLocalsModal users={this.state.users} key={this.state.users.id} />
        </div>
        ;
      </React.Fragment>
    );
  }
}

export default EventLocalUsers;

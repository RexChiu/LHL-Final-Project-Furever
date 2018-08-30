import React, { Component } from 'react';

//import assets

class EventLocals extends Component {
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
    let userItems;
    if (users instanceof Array) {
      userItems = users.map((user, i) => (
        <div>
          <p> user id: </p>
          <p> {user.id} </p>
          <p> username: </p>
          <p> {user.attributes.username} </p>
          {/* <img src= {user.attributes.pets[0].photos[0]} > */}
        </div>
      ));
    }
    // console.log(users[0].attributes.id);
    // let userItems = '';
    return (
      <p> {userItems} </p>
      // {users[0].attributes.id};
    );
  }
}

export default EventLocals;

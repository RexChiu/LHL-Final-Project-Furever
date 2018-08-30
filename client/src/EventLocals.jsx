import React, { Component } from 'react';

//import assets

class EventLocals extends Component {
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

    return (
    if (users instanceof Array) {
      userItems = users.map((user, i) => <p> user.id </p>);
    });
    
  }
}

export default EventLocals;

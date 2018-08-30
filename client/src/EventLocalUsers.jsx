import React, { Component } from 'react';
//import assets

class EventLocalUsers extends Component {
  componentDidMount() {
    //code I added in will link to server
    fetch('http://localhost:8080/pets')
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            isLoaded: true,
            pets: result.data
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
    return (
      <React.Fragment>
        <section id="eventlocalusers">
          <p id="eventlocal"> Locals: </p>

          <div>
            <a> woah </a>
          </div>
          <p id="friendrequest"> Friend Request: </p>
          <button className="btn btn-sm btn-block"> Find </button>
        </section>
      </React.Fragment>
    );
  }
}

export default EventLocalUsers;

import React, { Component } from 'react';

//import assets

class EventLocals extends Component {
  render() {
    // const { users } = this.props;
    // let userItems= <img className="eventLocalsIcon" src={user.attributes.pets[0].photos[0]} alt="notWorking" height="42" width="42" />
    // if (users instanceof Array) {
    //   userItems = users.map((user, i) => (
    //     <section>
    //       {/* <p> user id: </p>
    //       <p> {user.id} </p>
    //       <p> username: </p>
    //       <p> {user.attributes.username} </p> */}
    //       <img className="eventLocalsIcon" src={user.attributes.pets[0].photos[0]} alt="notWorking" height="42" width="42" />
    //     </section>
    //   ));

    return <img className="eventLocalsIcon" src={this.props.user.attributes.pets[0].photos[0]} alt="notWorking" height="42" width="42" />;
  }
}

export default EventLocals;

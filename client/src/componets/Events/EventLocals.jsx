import React, { Component } from 'react';

//import assets
//Purpose of Component: This component shows a modal with the individual users
//on the Event Page under the Locals container
//User can invite other Users to an Event
class EventLocals extends Component {
  addEventWithFriend = () => event => {
    this.props.setEventName('PetTinder with ' + this.props.user.attributes.username);
    this.props.showClippy(true, 'invite');
  };

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

    return (
      <React.Fragment>
        <img
          className="eventLocalsIcon"
          src={this.props.photo}
          alt="notWorking"
          width="21%"
          // height="21%"
          // height="42"
          // width="42"
          data-toggle="modal"
          href={'#singleLocals' + this.props.randomkey}
        />

        {/* Individual Modals */}
        {/* modalz */}

        <div id={'singleLocals' + this.props.randomkey} className="modal fade modalz">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal" aria-hidden="true">
                  &times;
                </button>
                <h4 className="modal-title">Pet Select</h4>
                <p> - Find a nearby friend - </p>
              </div>
              <hr />
              <div className="modal-body">
                {/* <img className="eventLocalsModal" src={this.props.photo} alt="notWorking" /> */}

                <div className="card">
                  <img className="eventLocalsModal" src={this.props.photo} alt="notWorking" />
                  <div className="card-body">
                    <h5 className="card-title">Owner: {this.props.user.attributes.username}</h5>
                    <p className="card-text">Name: {this.props.user.attributes.pets[0].name}</p>
                    <p className="card-text">Sex: {this.props.user.attributes.pets[0].sex}</p>
                    <p className="card-text">Age: {this.props.user.attributes.pets[0].age}</p>
                    <p className="card-text">Breed: {this.props.user.attributes.pets[0].breed}</p>
                    <p className="card-text">Mix?: {this.props.user.attributes.pets[0].mix}</p>
                    <p className="card-text">Size: {this.props.user.attributes.pets[0].size}</p>
                  </div>
                </div>

                {/* <h1> -USER INFO- </h1>
                <p> username: {this.props.user.attributes.username} </p>
                <p> id: {this.props.user.attributes.id} </p>
                <h1> -PET INFO-</h1>
                <p> name: {this.props.user.attributes.pets[0].name} </p>
                <p> sex: {this.props.user.attributes.pets[0].sex} </p>
                <p> age: {this.props.user.attributes.pets[0].age} </p>
                <p> breed: {this.props.user.attributes.pets[0].breed} </p>
                <p> mix? {this.props.user.attributes.pets[0].mix} </p>
                <p> size: {this.props.user.attributes.pets[0].size} </p> */}
              </div>
              <hr />

              <div className="modal-footer">
                <button type="button" className="btn btn-default" onClick={this.addEventWithFriend()} data-dismiss="modal">
                  Invite
                </button>
                <button type="button" className="btn btn-default" data-dismiss="modal">
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default EventLocals;

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

    return (
      <React.Fragment>
        <img
          className="eventLocalsIcon"
          src={this.props.photo}
          alt="notWorking"
          height="42"
          width="42"
          data-toggle="modal"
          href={'#singleLocals' + this.props.randomkey}
        />

        {/* Individual Modals */}

        <div id={'singleLocals' + this.props.randomkey} className="modal fade">
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
                <img className="eventLocalsModal" src={this.props.photo} alt="notWorking" />

                <h1> -USER INFO- </h1>
                <p> username: {this.props.user.attributes.username} </p>
                <p> id: {this.props.user.attributes.id} </p>
                <h1> -PET INFO-</h1>
                <p> name: {this.props.user.attributes.pets[0].name} </p>
                <p> sex: {this.props.user.attributes.pets[0].sex} </p>
                <p> age: {this.props.user.attributes.pets[0].age} </p>
                <p> breed: {this.props.user.attributes.pets[0].breed} </p>
                <p> mix? {this.props.user.attributes.pets[0].mix} </p>
                <p> size: {this.props.user.attributes.pets[0].size} </p>
              </div>
              <hr />

              <div className="modal-footer">
                <button type="button" className="btn btn-default" data-dismiss="modal">
                  Invite
                </button>
                <button type="button" className="btn btn-default" data-dismiss="modal">
                  Reject
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

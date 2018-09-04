import React, { Component } from 'react';

//import assets
//Purpose of Component: When User clicks Find in the Events Page
//this component renders a Carousel to show other users Pets to
//invite and create an Event
class EventLocalsModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      users: []
    };
  }

  //Takes in a Username and populates the Event Title in the Events page
  addEventWithFriend = param => event => {
    this.props.setEventName('Meeting with ' + param.username);
    this.props.showClippy(true, 'invite');
  };

  showFollowing = () => {
    console.log('Following');
  };

  render() {
    const { users } = this.props;
    let tinderItems = [];
    let tinderPhotos = [];

    //Iterate through each user to pick out the username, id and photo
    //into a new array called tinderPhoto
    if (users instanceof Array) {
      for (let i = 0; i < users.length; i++) {
        for (let j = 0; j < users[i].attributes.pets.length; j++) {
          if (!(users[i].id === sessionStorage.getItem('userId'))) {
            let adoptedPetPhoto = users[i].attributes.pets[j].photos[0];
            tinderPhotos.push({
              username: users[i].attributes.username,
              userid: users[i].attributes.id,
              picture: adoptedPetPhoto
            });
            adoptedPetPhoto = '';
          }
        }
      }
    }

    //Iterate through each tinderPhoto element to generate the HTML div
    if (tinderPhotos instanceof Array) {
      tinderItems = tinderPhotos.map((photo, i) => (
        <div className="item" key={i}>
          <img className="eventLocalsIcon" src={photo.picture} alt="notWorking" data-dismiss="modal" onClick={this.addEventWithFriend(photo)} />
        </div>
      ));
    }

    return (
      <React.Fragment>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal" aria-hidden="true">
                &times;
              </button>
              <h4 className="modal-title">Pet Select</h4>
              <p> - Find a nearby friend - </p>
            </div>
            <div className="modal-body">
              <div id="pets-modal" className="carousel slide" data-ride="carousel">
                <div className="carousel-inner" role="listbox">
                  <div className="item active">
                    <img src={require('../../assets/background.png')} alt="notWorking" id="mouseUI" />
                    <div className="carousel-caption">
                      <h3>Pet Tinder</h3>
                      <p>Choose a Pet companion to hang out with</p>
                    </div>
                  </div>
                  {tinderItems}
                </div>
                <a className="left carousel-control" href="#pets-modal" data-slide="prev">
                  <span className="glyphicon glyphicon-chevron-left" />
                </a>
                <a className="right carousel-control" href="#pets-modal" data-slide="next">
                  <span className="glyphicon glyphicon-chevron-right" />
                </a>
              </div>
            </div>
            <div className="modal-footer">
              <section>
                <p>Selected: </p>
              </section>
              <button type="button" className="btn btn-default" data-dismiss="modal">
                Close
              </button>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default EventLocalsModal;

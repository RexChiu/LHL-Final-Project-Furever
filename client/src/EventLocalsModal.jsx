import React, { Component } from 'react';

//import assets

class EventLocalsModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      users: []
    };
  }

  render() {
    const { users } = this.props;
    let tinderItems = [];

    if (users instanceof Array) {
      tinderItems = users.map((user, i) => (
        <div className="item">
          <img className="eventLocalsIcon" src={user.attributes.pets[0].photos[0]} alt="notWorking" />
        </div>
      ));
      console.log(tinderItems);
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
              <div id="carousel-modal-demo" class="carousel slide" data-ride="carousel">
                <div class="carousel-inner" role="listbox">
                  <div class="item active">
                    <img src={require('./assets/tinder.png')} alt="notWorking" id="mouseUI" />
                    <div class="carousel-caption">
                      <h3>Heading 3</h3>
                      <p>Slide 0 description.</p>
                    </div>
                  </div>
                  <div class="item">
                    <img src={require('./assets/pet-tinder-dump-246332.jpg')} alt="notWorking" id="mouseUI" />
                  </div>
                  {tinderItems}
                </div>
                <a class="left carousel-control" href="#carousel-modal-demo" data-slide="prev">
                  <span class="glyphicon glyphicon-chevron-left" />
                </a>
                <a class="right carousel-control" href="#carousel-modal-demo" data-slide="next">
                  <span class="glyphicon glyphicon-chevron-right" />
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
// }

export default EventLocalsModal;

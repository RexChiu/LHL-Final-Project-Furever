import React, { Component } from 'react';

//import assets

class EventLocalsModal extends Component {
  render() {
    const { users } = this.props;
    // const { users } = this.state;
    let tinderItems = '';
    if (users instanceof Array) {
      tinderItems = users.map((user, i) => (
        <div className="carousel-item">
          {/* <p> {user.id} </p> */}
          <img className="eventLocalsIcon" src={user.attributes.pets[0].photos[0]} alt="notWorking" />
          {/* <a className="btn btn-lg btn-primary">Nya...</a>
          <a className="btn btn-lg btn-primary">Yeah!</a> */}
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
              {/* <p> {this.props.user.id}</p> */}

              <div id="carouselExampleControls" className="carousel slide" data-ride="carousel">
                <div className="carousel-inner">{tinderItems}</div>
                <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                  <span className="carousel-control-prev-icon" aria-hidden="true" />
                  <span className="sr-only">Previous</span>
                </a>
                <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                  <span className="carousel-control-next-icon" aria-hidden="true" />
                  <span className="sr-only">Next</span>
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

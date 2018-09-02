import React, { Component } from 'react';

//import assets

class EventComposeFeed extends Component {
  render() {
    //display like count
    var countLikeLength;
    if (this.props.event.attributes.going === undefined || this.props.event.attributes.going === null) {
      countLikeLength = <p> 0 </p>;
    } else {
      countLikeLength = <p> {this.props.event.attributes.going.length} </p>;
    }

    return (
      <React.Fragment>
        <div className="panel eventPanel">
          <div>
            {' '}
            <h3> {this.props.event.attributes.title} </h3>
            <h4> Created By: {this.props.event.attributes.user} </h4>
            <div className="eventDescription">
              <h7> Date: {this.props.event.attributes.date} </h7>
              <p> description: {this.props.event.attributes.description} </p>
            </div>
            {/* <labelGoingCount /> */}
            {countLikeLength}
            <button id="buttonGoing" onClick={this.props.handleGoing} value={this.props.event.attributes.id}>
              {' '}
              going
            </button>
            <p> {this.props.event.attributes.going} </p>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default EventComposeFeed;

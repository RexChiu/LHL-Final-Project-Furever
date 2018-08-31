import React, { Component } from 'react';

class Places extends Component {
  //Function to determine if the establishment is currently OPEN or CLOSED
  return_open = status => {
    if (status === true) {
      return 'OPEN';
    }
    return 'CLOSED';
  };
  render() {
    return (
      <React.Fragment>
        <tr>
          <th className="col-m">{this.props.place.name}</th>
          <th className="col-sm"> {this.props.place.rating}</th>
          <th className="col-sm"> {this.return_open(this.props.place['opening-hours']['open_now'])}</th>
        </tr>
      </React.Fragment>
    );
  }
}

export default Places;

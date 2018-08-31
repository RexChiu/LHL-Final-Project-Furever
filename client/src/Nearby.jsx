import React, { Component } from 'react';
//import assets

//modal

import Vet from './Vet';

class Nearby extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false
    };
  }

  componentDidMount() {
    //code I added in will link to server
  }

  render() {
    return (
      <React.Fragment>
        <p> Resources Nearby </p>
        <Vet />
      </React.Fragment>
    );
  }
}
export default Nearby;

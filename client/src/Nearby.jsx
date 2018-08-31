import React, { Component } from 'react';
//import assets

//modal

// import Vet from './Vet';
import Store from './Store';

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
        <h2>Resources Nearby</h2>
        <Store type={'veterinary_care'} establishment={'Hospital'} />
        <Store type={'pet_store'} establishment={'Store'} />
      </React.Fragment>
    );
  }
}
export default Nearby;

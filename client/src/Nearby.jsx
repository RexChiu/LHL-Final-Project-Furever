import React, { Fragment, Component } from 'react';
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

  render() {
    return (
      <Fragment>
        <h1>Resources Nearby</h1>
        {this.renderNearBy()}
      </Fragment>
    );
  }

  renderNearBy = () => {
    if (!sessionStorage.getItem('userId')) {
      return 'Please Login to see this page!';
    }
    return (
      <Fragment>
        <Store type={'veterinary_care'} establishment={'Hospital'} />
        <Store type={'pet_store'} establishment={'Store'} />
      </Fragment>
    );
  };
}
export default Nearby;

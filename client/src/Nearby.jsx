import React, { Fragment, Component } from 'react';
import ReactLoading from 'react-loading';

import Store from './Store';

class Nearby extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isVetLoaded: false,
      isStoreLoaded: false
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

  loading = () => {
    if (!this.state.isVetLoaded || !this.state.isStoreLoaded) {
      return (
        <Fragment>
          <strong>Loading...</strong>
          <ReactLoading className="loading-icon" type={'spinningBubbles'} color={'#000000'} height={'10%'} width={'10%'} />
        </Fragment>
      );
    }
  };

  renderNearBy = () => {
    if (!sessionStorage.getItem('userId')) {
      return 'Please Login to see this page!';
    }
    return (
      <Fragment>
        {this.loading()}
        <Store type={'veterinary_care'} loadedVet={this.loadedVet} establishment={'Hospital'} />
        <Store type={'pet_store'} loadedStore={this.loadedStore} establishment={'Store'} />
      </Fragment>
    );
  };

  loadedVet = () => {
    this.setState({ isVetLoaded: true });
  };

  loadedStore = () => {
    this.setState({ isStoreLoaded: true });
  };
}
export default Nearby;

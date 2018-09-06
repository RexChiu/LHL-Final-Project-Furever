import React, { Fragment, Component } from 'react';
import ReactLoading from 'react-loading';

import Store from './Store';

class Nearby extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false
    };

    // not logged in, redirect to home page
    if (!sessionStorage.getItem('userId')) {
      alert('Unauthorized Access! Login First!');
      this.props.history.push('/');
    }

    // empty clippy, scroll to top
    this.props.showClippy(false, 'empty');
    window.scrollTo(0, 0);
  }

  componentDidMount() {
    this.props.showClippy(true, 'nearby');
  }

  render() {
    return (
      <Fragment>
        <div className="jumbotron nearby-container">
          <h1>Resources Nearby</h1>
          {this.renderNearBy()}
        </div>
      </Fragment>
    );
  }

  loading = () => {
    if (!this.state.isLoaded) {
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
        <Store type={'pet_store'} isLoaded={this.isLoaded} establishment={'Store'} />
        <Store type={'veterinary_care'} isLoaded={this.isLoaded} establishment={'Hospital'} />
      </Fragment>
    );
  };

  isLoaded = () => {
    this.setState({ isLoaded: true });
  };
}
export default Nearby;

import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import { Tooltip, Overlay } from 'react-bootstrap';

import Clippy from './Clippy';

class Footer extends Component {
  constructor(props) {
    super(props);

    // create a reference to the clippy component
    this.clippy = React.createRef();
  }

  render() {
    return this.renderClippy();
  }

  // show clippy only if app sets clippy to show
  renderClippy = () => {
    if (this.props.show === true) {
      // object to map a key to a function that renders the correct message
      const clippyMessages = {
        adopted: this.adoptedMessage,
        login: this.loginMessage,
        invite: this.inviteMessage,
        empty: "I shouldn't be here!?",
        care: this.careMessage,
        nearby: this.nearbyMessage,
        adopt: this.adoptMessage
      };

      return (
        <div className="navbar navbar-fixed-bottom">
          <Clippy showClippy={this.props.showClippy} ref={this.clippy} />
          <Overlay container={this} show={this.props.show} placement="top" target={() => ReactDOM.findDOMNode(this.clippy.current)}>
            <Tooltip id="tooltip">{clippyMessages[this.props.textKey]()}</Tooltip>
          </Overlay>
        </div>
      );
    }
    return '';
  };

  // function to remove clippy
  hideClippy = () => {};

  // functions to return the correct message when called.
  adoptedMessage = () => {
    return (
      <Fragment>
        <p className="clippy-message">
          You have adopted a Pet! Click <Link to="/events">here</Link> for Events! Or <Link to="/care">here</Link> for Pet Care Info!
        </p>
      </Fragment>
    );
  };

  loginMessage = () => {
    return (
      <Fragment>
        <p className="clippy-message">Please Login/Register to see our member specific features!</p>
      </Fragment>
    );
  };

  inviteMessage = () => {
    return (
      <Fragment>
        <p className="clippy-message">Please fill in the form to invite the user to an event!</p>
      </Fragment>
    );
  };

  careMessage = () => {
    return (
      <Fragment>
        <p className="clippy-message">Looks like you have a {this.props.message}.</p>
      </Fragment>
    );
  };

  nearbyMessage = () => {
    return (
      <Fragment>
        <p className="clippy-message">Here are the nearby Pet Stores and Vets!</p>
      </Fragment>
    );
  };

  adoptMessage = () => {
    return (
      <Fragment>
        <p className="clippy-message">Adopt your Fur <i className="fas fa-paw home-title-icon" /> Ever pet here!</p>
      </Fragment>
    );
  };
}

export default Footer;

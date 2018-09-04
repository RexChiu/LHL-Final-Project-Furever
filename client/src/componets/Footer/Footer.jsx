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

  renderClippy = () => {
    if (this.props.show === true) {
      const clippyMessages = {
        adopted: this.adoptedMessage,
        login: this.loginMessage,
        invite: this.inviteMessage,
        empty: '?'
      };

      return (
        <div className="navbar navbar-fixed-bottom">
          <Clippy ref={this.clippy} />
          <Overlay container={this} show={this.props.show} placement="top" target={() => ReactDOM.findDOMNode(this.clippy.current)}>
            <Tooltip id="tooltip">{clippyMessages[this.props.text]()}</Tooltip>
          </Overlay>
        </div>
      );
    }
    return '';
  };

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
}

export default Footer;

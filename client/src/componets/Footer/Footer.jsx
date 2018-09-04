import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import { Tooltip, Overlay } from 'react-bootstrap';

import Clippy from './Clippy';

class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: this.props.show,
      text: this.props.text
    };

    this.clippy = React.createRef();
  }

  render() {
    return this.renderClippy();
  }

  renderClippy = () => {
    if (this.state.show) {
      return (
        <div className="navbar navbar-fixed-bottom">
          <Clippy ref={this.clippy} />
          <Overlay container={this} show={this.state.show} placement="top" target={() => ReactDOM.findDOMNode(this.clippy.current)}>
            <Tooltip id="tooltip">{this.state.text}</Tooltip>
          </Overlay>
        </div>
      );
    }
    return '';
  };
}

export default Footer;

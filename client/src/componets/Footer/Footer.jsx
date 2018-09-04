import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import { Tooltip, Overlay } from 'react-bootstrap';

import Clippy from './Clippy';

class Footer extends Component {
  constructor(props) {
    super(props);

    this.clippy = React.createRef();
  }
  render() {
    return (
      <div className="navbar navbar-fixed-bottom">
        <Clippy ref={this.clippy} />
        <Overlay container={this} show="true" placement="top" target={() => ReactDOM.findDOMNode(this.clippy.current)}>
          <Tooltip id="tooltip">
            Cats! <Link to="/adopt">Adopt </Link>
          </Tooltip>
        </Overlay>
      </div>
    );
  }
}

export default Footer;

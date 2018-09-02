import React, { Fragment, Component } from 'react';

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      name: '',
      email: '',
      lat: '43.6444',
      lng: '-79.3951'
    };

    this.getLocation();
  }

  render() {
    return (
      <Fragment>
        <p>register</p>
        <form onSubmit={this.submitRegister}>
          <label>
            username:
            <input name="username" type="text" onChange={this.handleChangeRegisterUsername} />
          </label>
          <label>
            password:
            <input name="password" type="password" onChange={this.handleChangeRegisterPassword} />
          </label>

          <input id="buttonColor" type="submit" value="Submit" />
        </form>
      </Fragment>
    );
  }

  // function call to grab the gps locations of the user
  getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.setLocation);
    }
  };

  // callback function to set the current state to the current location
  setLocation = position => {
    this.setState({ lat: position.coords.latitude, lng: position.coords.longitude });
  };
}

export default Register;

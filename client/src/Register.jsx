import React, { Component } from 'react';

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      email: '',
      lat: '43.6444',
      lng: '-79.3951'
    };

    this.getLocation();
  }

  render() {
    return (
      <form id="register-form" onSubmit={this.submitRegister}>
        <div className="form-group">
          <input placeholder="Username" class="form-control" tabindex="1" name="username" type="text" onChange={this.handleChangeUsername} />
        </div>
        <div className="form-group">
          <input placeholder="Email" class="form-control" tabindex="2" name="email" type="text" onChange={this.handleChangeEmail} />
        </div>
        <div className="form-group">
          <input placeholder="Password" class="form-control" tabindex="3" name="password" type="password" onChange={this.handleChangePassword} />
        </div>
        <div className="form-group">
          <div className="row">
            <div className="col-sm-6 col-sm-offset-3">
              <input className="form-control btn btn-register" type="submit" name="register-submit" tabindex="4" value="Register" />
            </div>
          </div>
        </div>
      </form>
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

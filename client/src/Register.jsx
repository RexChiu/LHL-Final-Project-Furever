import React, { Component } from 'react';
import axios from 'axios';

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

  submitRegister = event => {
    event.preventDefault();

    // stops submit if either username or password is blank
    if (!this.state.username || !this.state.password) {
      alert('Username or Password is Blank!');
      return;
    }

    const reqObj = {
      username: this.state.username,
      password: this.state.password,
      lat: this.state.lat,
      lng: this.state.lng,
      adopted: false
    };

    axios
      .post('http://localhost:8080/user/register', reqObj)
      .then(res => {
        //grabs the userId from the successful login response
        sessionStorage.setItem('userId', res.data.data.attributes.id);
        sessionStorage.setItem('username', res.data.data.attributes.username);
        sessionStorage.setItem('lat', res.data.data.attributes.lat);
        sessionStorage.setItem('lng', res.data.data.attributes.lng);
        sessionStorage.setItem('adopted', res.data.data.attributes.adopted);
        this.props.history.push('/adopt');
      })
      .catch(err => alert(err));
  };

  // controlled input for username
  handleChangeUsername = event => {
    this.setState({
      username: event.target.value.trim()
    });
  };

  // controlled input for email
  handleChangeEmail = event => {
    this.setState({
      email: event.target.value.trim()
    });
  };

  // controlled input for password
  handleChangePassword = event => {
    this.setState({
      password: event.target.value.trim()
    });
  };
}

export default Register;

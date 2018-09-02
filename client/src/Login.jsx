import React, { Component } from 'react';
import axios from 'axios';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: ''
    };
  }

  render() {
    return (
      <form id="login-form" onSubmit={this.submitLogin}>
        <div className="form-group">
          <input placeholder="Username" class="form-control" tabindex="1" name="username" type="text" onChange={this.handleChangeUsername} />
        </div>
        <div className="form-group">
          <input placeholder="Password" class="form-control" tabindex="2" name="password" type="password" onChange={this.handleChangePassword} />
        </div>
        <div className="form-group">
          <div className="row">
            <div className="col-sm-6 col-sm-offset-3">
              <input className="form-control btn btn-login" type="submit" name="login-submit" tabindex="4" value="Log In" />
            </div>
          </div>
        </div>
      </form>
    );
  }

  submitLogin = event => {
    event.preventDefault();

    // stops submit if either username or password is blank
    if (!this.state.username || !this.state.password) {
      alert('Username or Password is Blank!');
      return;
    }

    const reqObj = {
      username: this.state.username,
      password: this.state.password
    };

    axios
      .post('http://localhost:8080/user/login', reqObj)
      .then(res => {
        //grabs the userId from the successful login response
        sessionStorage.setItem('userId', res.data.data.attributes.id);
        sessionStorage.setItem('username', res.data.data.attributes.username);
        sessionStorage.setItem('lat', res.data.data.attributes.lat);
        sessionStorage.setItem('lng', res.data.data.attributes.lng);
        sessionStorage.setItem('adopted', res.data.data.attributes.adopted);
        sessionStorage.setItem('email', res.data.data.attributes.email);
        this.props.redirectAdoptPage();
      })
      .catch(err => alert(err));
  };

  // controlled input for username
  handleChangeUsername = event => {
    this.setState({
      username: event.target.value.trim()
    });
  };

  // controlled input for password
  handleChangePassword = event => {
    this.setState({
      password: event.target.value.trim()
    });
  };
}

export default Login;

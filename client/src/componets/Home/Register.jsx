import React, { Fragment, Component } from 'react';
import ReactLoading from 'react-loading';
import axios from 'axios';

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      email: '',
      lat: '43.6444',
      lng: '-79.3951',
      loading: false
    };

    this.getLocation();
  }

  render() {
    let loading = '';
    if (this.state.loading) {
      loading = (
        <Fragment>
          <strong>Loading...</strong>
          <ReactLoading className="loading-icon" type={'spinningBubbles'} color={'#000000'} height={'10%'} width={'10%'} />
        </Fragment>
      );
    }
    return (
      <Fragment>
        <form id="register-form" onSubmit={this.submitRegister}>
          <div className="form-group">
            <input placeholder="Username" className="form-control" tabIndex="1" name="username" type="text" onChange={this.handleChangeUsername} />
          </div>
          <div className="form-group">
            <input placeholder="Email" className="form-control" tabIndex="2" name="email" type="text" onChange={this.handleChangeEmail} />
          </div>
          <div className="form-group">
            <input placeholder="Password" className="form-control" tabIndex="3" name="password" type="password" onChange={this.handleChangePassword} />
          </div>
          <div className="form-group">
            <div className="row">
              <div className="col-sm-6 col-sm-offset-3">
                <input className="form-control btn btn-register" type="submit" name="register-submit" tabIndex="4" value="Register" />
              </div>
            </div>
          </div>
        </form>
        {loading}
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

  submitRegister = event => {
    event.preventDefault();
    this.setState({ loading: true });

    // stops submit if either username or password is blank
    if (!this.state.username || !this.state.password) {
      alert('Username or Password is Blank!');
      return;
    }

    const reqObj = {
      username: this.state.username,
      email: this.state.email,
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
        sessionStorage.setItem('email', res.data.data.attributes.email);
        this.setState({ loading: false });
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

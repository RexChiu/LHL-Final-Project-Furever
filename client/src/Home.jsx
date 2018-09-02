import React, { Fragment, Component } from 'react';
import axios from 'axios';
//import assets
import Login from './Login.jsx';
import Register from './Register.jsx';

class Home extends Component {
  render() {
    return (
      <Fragment>
        <video id="home-video-background" loop autoPlay>
          <source src={require('./assets/bg.mp4')} type="video/mp4" />
        </video>

        <section id="home-panel" className="panel panel-default">
          <h1 className="home-title">
            Fur <i className="fas fa-paw home-title-icon" /> Ever
          </h1>

          {this.greetings()}
        </section>
      </Fragment>
    );
  }

  greetings = () => {
    // show message if already logged in
    if (sessionStorage.getItem('userId')) {
      return 'Already Logged In!';
    }
    // not logged in, show login and register
    return (
      <div className="panel-body">
        <div className="row">
          <div className="col-lg-12">
            <Login />
            <Register />
          </div>
        </div>
      </div>
    );
  };

  submitLogin = event => {
    event.preventDefault();

    // stops submit if either username or password is blank
    if (!this.state.login_username || !this.state.login_password) {
      alert('Username or Password is Blank!');
      return;
    }

    const reqObj = {
      username: this.state.login_username,
      password: this.state.login_password
    };

    axios
      .post('http://localhost:8080/user/login', reqObj)
      .then(res => {
        //grabs the userId from the successful login response
        let userId = { userId: res.data.data.attributes.id };
        this.props.setUserId(userId);
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
  handleChangeLoginUsername = event => {
    this.setState({
      login_username: event.target.value.trim()
    });
  };

  // controlled input for password
  handleChangeLoginPassword = event => {
    this.setState({
      login_password: event.target.value.trim()
    });
  };

  submitRegister = event => {
    event.preventDefault();

    // stops submit if either username or password is blank
    if (!this.state.register_username || !this.state.register_password) {
      alert('Username or Password is Blank!');
      return;
    }

    const reqObj = {
      username: this.state.register_username,
      password: this.state.register_password,
      lat: this.state.lat,
      lng: this.state.lng,
      adopted: false
    };

    axios
      .post('http://localhost:8080/user/register', reqObj)
      .then(res => {
        //grabs the userId from the successful login response
        let userId = { userId: res.data.data.attributes.id };
        this.props.setUserId(userId);
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
  handleChangeRegisterUsername = event => {
    this.setState({
      register_username: event.target.value.trim()
    });
  };

  // controlled input for password
  handleChangeRegisterPassword = event => {
    this.setState({
      register_password: event.target.value.trim()
    });
  };
}

export default Home;

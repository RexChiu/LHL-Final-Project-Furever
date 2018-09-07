import React, { Fragment, Component } from 'react';
import ReactLoading from 'react-loading';
import axios from 'axios';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      loading: false
    };
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
        <form id="login-form" onSubmit={this.submitLogin}>
          <div className="form-group">
            <input placeholder="Username" className="form-control" tabIndex="1" name="username" type="text" onChange={this.handleChangeUsername} />
          </div>
          <div className="form-group">
            <input placeholder="Password" className="form-control" tabIndex="2" name="password" type="password" onChange={this.handleChangePassword} />
          </div>
          <div className="form-group">
            <div className="row">
              <div className="col-sm-6 col-sm-offset-3">
                <input className="form-control btn btn-login" type="submit" name="login-submit" tabIndex="4" value="Log In" />
              </div>
            </div>
          </div>
        </form>
        {loading}
      </Fragment>
    );
  }

  submitLogin = event => {
    event.preventDefault();

    this.setState({ loading: true });

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

  // controlled input for password
  handleChangePassword = event => {
    this.setState({
      password: event.target.value.trim()
    });
  };
}

export default Login;

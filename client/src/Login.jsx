import React, { Fragment, Component } from 'react';

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
      <Fragment>
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

          <input id="buttonColor" type="submit" value="Submit" />
        </form>
      </Fragment>
    );
  }
}

export default Login;

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
        <p>login</p>
        <form onSubmit={this.submitLogin}>
          <label>
            username:
            <input name="username" type="text" onChange={this.handleChangeLoginUsername} />
          </label>
          <label>
            password:
            <input name="password" type="password" onChange={this.handleChangeLoginPassword} />
          </label>

          <input id="buttonColor" type="submit" value="Submit" />
        </form>
      </Fragment>
    );
  }
}

export default Login;

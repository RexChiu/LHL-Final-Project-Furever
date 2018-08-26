import React, { Component } from 'react';
//import assets

class Home extends Component {
  render() {
    return (
      <React.Fragment>
        <img src="../public/favicon.ico" alt="notWorking" />
        <p>login</p>
        <form method="post" id="login" action="/user/login">
          <label>
            username:
            <input name="username" type="text" onChange={this.handleChange} />
          </label>
          <label>
            password:
            <input name="password" type="password" name="password" />
          </label>

          <input type="submit" value="Submit" />
        </form>

        <p>register</p>
        <form method="post" id="login" action="/user/register">
          <label>
            username:
            <input name="username" type="text" />
          </label>
          <label>
            password:
            <input name="password" type="password" name="password" />
          </label>

          <input type="submit" value="Submit" />
        </form>
      </React.Fragment>
    );
  }
}

export default Home;

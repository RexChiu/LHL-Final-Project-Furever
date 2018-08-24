import React, { Component } from 'react';
//import assets

class Home extends Component {
  render() {
    return (
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
    );
  }
}

export default Home;

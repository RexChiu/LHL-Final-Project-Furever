import React, { Component } from 'react';
//import assets

class Home extends Component {
  render() {
    return (
      <React.Fragment>
        <video id="home-video-background" loop autoPlay>
          <source src={require('./assets/bg.mp4')} type="video/mp4" />
        </video>

        <section id="home-panel" class="panel panel-default">
          <img src={require('./assets/moe_00.png')} alt="notWorking" id="mouseUI" />
          <p>login</p>
          <form method="post" id="login" action="http://localhost:8080/user/login">
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
          <form method="post" id="login" action="http://localhost:8080/user/register">
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
        </section>
      </React.Fragment>
    );
  }
}

export default Home;

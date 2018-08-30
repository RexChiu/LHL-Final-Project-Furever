import React, { Component, Fragment } from 'react';

//import assets

class Care extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: ''
    };
  }

  componentDidMount() {
    // on page load, get the user object
    if (sessionStorage.getItem('userId')) {
      const userId = sessionStorage.getItem('userId');
      if (userId) {
        fetch(`http://localhost:8080/user/${userId}/withpets`)
          .then(res => res.json())
          .then(res => {
            console.log(res);
            this.setState({ user: res.data.attributes });
          });
      }
    }
  }

  render() {
    return <Fragment>{this.loggedInUser()}</Fragment>;
  }

  loggedInUser = () => {
    if (!sessionStorage.getItem('userId')) {
      return <div>Login to See this Page!</div>;
    } else {
      // checks if the logged in user has a pet
      if (this.state.user.adopted) {
        return <div>You have pets!</div>;
      } else {
        return <div>Adopt a pet first!</div>;
      }
    }
  };
}

export default Care;

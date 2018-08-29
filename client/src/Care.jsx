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
    const userId = sessionStorage.getItem('userId');
    if (userId) {
      fetch(`http://localhost:8080/user/${userId}`)
        .then(res => res.json())
        .then(res => {
          console.log(res.data.attributes);
          this.setState({ user: res.data.attributes });
        });
    }
  }

  render() {
    return <Fragment>{this.loggedInUser()}</Fragment>;
  }

  loggedInUser = () => {
    if (!sessionStorage.getItem('userId')) {
      return <div>Login to See this Page!</div>;
    } else {
      return 'Cats';
    }
  };
}

export default Care;

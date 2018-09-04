import React, { Component } from 'react';
//import assets

class EventUserInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      users: ''
    };
  }

  componentDidMount() {
    // this.props.setEventName('Cats');
    //code I added in will link to server
    fetch('http://localhost:8080/user/withpets')
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            isLoaded: true,
            users: result.data
          });
        },

        error => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      );
  }

  render() {
    const { users } = this.state;
    let userItems = [];

    //loops through owners pets and then places them on the page
    if (users instanceof Array) {
      for (let i = 0; i < users.length; i++) {
        for (let j = 0; j < users[i].attributes.pets.length; j++) {
          if (users[i].id === sessionStorage.getItem('userId')) {
            console.log('WORK DAMN IT');
            let petphoto = users[i].attributes.pets[j].photos[0];
            console.log('Photo::', users[i].attributes.pets[j].photos[0], '||userid::', users[i].id);
            userItems.push(
              <div className="eventpetinfocolor">
                <img src={petphoto} alt="notWorking" width="100em" />
                <p> name: {users[i].attributes.pets[j].name} </p>
                <p> breed: {users[i].attributes.pets[j].breed} </p>
                <p> sex: {users[i].attributes.pets[j].sex} </p>
              </div>
            );
          }
        }
      }
    }

    return (
      <React.Fragment>
        <div id="eventuserinfo" className="pull-right col-sm-3 col-xs-3 ">
          <h4>
            {' '}
            <u> user info </u>{' '}
          </h4>
          <div id="eventsuserinformation">
            <p> username: {sessionStorage.getItem('username')} </p>
            {/* <p>
              user id: `$
              {sessionStorage.getItem('userId')}`{' '}
            </p> */}
          </div>
          <h4>
            {' '}
            <u> pet info </u>{' '}
          </h4>
          <div>{userItems}</div>
        </div>
      </React.Fragment>
    );
  }
}
export default EventUserInfo;

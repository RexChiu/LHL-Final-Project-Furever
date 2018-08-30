import React, { Component } from 'react';
import Waypoint from 'react-waypoint';
//import assets

//modal

import AdoptFilter from './AdoptFilter';
import SearchUI from './SearchUI';
import Pet from './Pet';

class Adopt extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      pets: []
    };
  }

  componentDidMount() {
    //code I added in will link to server
    fetch('http://localhost:8080/pets')
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            isLoaded: true,
            pets: result.data
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

  rerenderPets = pets2 => {
    console.log('CLIENT-SIDE', JSON.parse(pets2).data.data);
    this.setState({ pets: JSON.parse(pets2).data.data });
  };

  render() {
    const { pets } = this.state;
    let adoptItems = '';
    if (pets instanceof Array) {
      adoptItems = pets.map((pet, i) => <Pet pet={pet} key={pet.id} />);
    }

    return (
      <React.Fragment>
        <p> Adopt Page </p>
        <SearchUI />
        <AdoptFilter rerenderPets={this.rerenderPets} />
        <div>{adoptItems}</div>
        <Waypoint scrollableAncestor={window} onEnter={this._handleWaypointEnter} bottomOffset="100px" />
      </React.Fragment>
    );
  }
}

export default Adopt;

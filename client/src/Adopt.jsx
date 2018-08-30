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
      .then(result => {
        this.setState({
          isLoaded: true,
          pets: result.data
        });
      });
  }

  rerenderPets = pets => {
    console.log('CLIENT-SIDE', JSON.parse(pets).data.data);
    this.setState({ pets: JSON.parse(pets).data.data, isLoaded: true });
  };

  _getMorePets = id => {
    fetch(`http://localhost:8080/pets/${id}`)
      .then(res => res.json())
      .then(result => {
        this.setState({
          isLoaded: true,
          pets: result.data
        });
      });
  };

  _handleWaypointEnter = () => {
    if (this.state.isLoaded) {
      const lastPet = this.state.pets.length - 1;
      const lastPetId = this.state.pets[lastPet].id;
      // alert(this.state.pets[lastPet].id);
    }
  };

  _renderWaypoint = () => {
    if (this.state.isLoaded) {
      // creates a waypoint that triggers on the bottom 50% of the scrolling
      return <Waypoint className="col-12" bottomOffset="-50%" onEnter={this._handleWaypointEnter} />;
    }
  };

  render() {
    const { pets } = this.state;
    let adoptItems = '';
    if (pets instanceof Array) {
      adoptItems = pets.map((pet, i) => <Pet className="pet-item" pet={pet} key={pet.id} />);
    }

    return (
      <React.Fragment>
        <p> Adopt Page </p>
        <SearchUI />
        <AdoptFilter rerenderPets={this.rerenderPets} />
        {adoptItems}
        <div className="col-sm-12">{this._renderWaypoint()}</div>
      </React.Fragment>
    );
  }
}
export default Adopt;

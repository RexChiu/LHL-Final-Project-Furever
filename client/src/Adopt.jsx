import React, { Component } from 'react';
import Waypoint from 'react-waypoint';
import axios from 'axios';
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
      pets: [],
      filters: {}
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

  rerenderPets = (pets, filters) => {
    console.log('CLIENT-SIDE', JSON.parse(pets).data.data);
    this.setState({ pets: JSON.parse(pets).data.data, isLoaded: true, filters });
  };

  resetFilter = () => {
    this.setState({ filters: {} });
  };

  // gets the next pets from the server, adds to the end of the pets array, re-renders automagically
  _getMorePets = id => {
    // fetch(`http://localhost:8080/pets/${id}`)
    //   .then(res => res.json())
    //   .then(result => {
    //     const pets = this.state.pets.concat(result.data);
    //     this.setState({ pets });
    //   })
    //   .catch(err => {
    //     alert(err);
    //   });

    const filters = this.state.filters;
    filters.lastPet = id;

    axios
      .put(`http://localhost:8080/pets/filter`, filters)
      .then(response => {
        // rerenderPets(JSON.stringify(response), outputObj);

        const pets = this.state.pets.concat(response.data.data);
        this.setState({ pets });
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  _handleWaypointEnter = () => {
    if (this.state.isLoaded) {
      const lastPet = this.state.pets.length - 1;
      const lastPetId = this.state.pets[lastPet].id;
      this._getMorePets(lastPetId);
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
        <AdoptFilter rerenderPets={this.rerenderPets} resetFilter={this.resetFilter} />
        {adoptItems}
        <div className="col-sm-12">{this._renderWaypoint()}</div>
      </React.Fragment>
    );
  }
}
export default Adopt;

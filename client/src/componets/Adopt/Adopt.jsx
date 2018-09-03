import React, { Fragment, Component } from 'react';
import Waypoint from 'react-waypoint';
import axios from 'axios';
import ReactLoading from 'react-loading';

//import assets

//modal

import AdoptFilter from './AdoptFilter';
// import SearchUI from './SearchUI';
import Pet from './Pet';

class Adopt extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      loadedMore: false,
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
          loadedMore: true,
          pets: result.data
        });
      });
  }

  rerenderPets = (pets, filters) => {
    // if not an array, put an empty array
    let petsArr = JSON.parse(pets).data.data;
    if (!(petsArr instanceof Array)) {
      petsArr = [];
    }
    this.setState({ pets: petsArr, isLoaded: true, loadedMore: true, filters });
  };

  resetFilter = () => {
    this.setState({ filters: {} });
  };

  // gets the next pets from the server, adds to the end of the pets array, re-renders automagically
  _getMorePets = id => {
    // guard statement to not ask for pets twice before loading it
    if (this.state.loadedMore === false) {
      return;
    }
    this.setState({ loadedMore: false });

    const filters = this.state.filters;
    filters.lastPet = id;

    axios
      .put(`http://localhost:8080/pets/filter`, filters)
      .then(response => {
        // if there are no results, it is not an array
        if (response.data.data instanceof Array) {
          const pets = this.state.pets.concat(response.data.data);
          this.setState({ pets, loadedMore: true });
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  _handleWaypointEnter = () => {
    if (this.state.loadedMore && this.state.pets.length > 0) {
      const lastPet = this.state.pets.length - 1;
      const lastPetId = this.state.pets[lastPet].id;
      this._getMorePets(lastPetId);
    }
  };

  _renderWaypoint = () => {
    if (this.state.isLoaded) {
      // creates a waypoint that triggers on the bottom 50% of the scrolling
      return <Waypoint className="col-12" bottomOffset="-20%" onEnter={this._handleWaypointEnter} />;
    }
  };

  _renderAdoptItems = () => {
    // render only if pet care info is loaded
    if (this.state.isLoaded) {
      const { pets } = this.state;
      let adoptItems = '';
      if (pets instanceof Array) {
        adoptItems = pets.map(pet => (
          <div className="col-lg-3 col-sm-4">
            <Pet className="pet-item" pet={pet} key={pet.id} />
          </div>
        ));
      }

      return adoptItems;
    } else {
      return (
        <Fragment>
          <strong>Loading...</strong>
          <ReactLoading className="loading-icon" type={'spinningBubbles'} color={'#000000'} height={'10%'} width={'10%'} />
        </Fragment>
      );
    }
  };

  render() {
    return (
      <React.Fragment>
        <img id="adoptbg" src={require('../../assets/adopt_bg2.jpeg')} alt="Girl in a jacket" />
        <div id="adopttitle">
          <h1> Pet Adoption </h1>
        </div>
        <div id="adoptContentPanel">
          <AdoptFilter rerenderPets={this.rerenderPets} resetFilter={this.resetFilter} />

          <div className="container-fluid">
            <div className="row">{this._renderAdoptItems()}</div>
          </div>
          <div className="col-lg-12">{this._renderWaypoint()}</div>
        </div>
      </React.Fragment>
    );
  }
}
export default Adopt;

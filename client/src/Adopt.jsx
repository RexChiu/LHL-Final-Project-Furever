import React, { Component } from 'react';
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

  render() {
    const { pets } = this.state;
    const adoptItems = pets.map((pet, i) => <Pet pet={pet} key={pet.id} />);

    return (
      <React.Fragment>
        <p> Adopt Page </p>
        <SearchUI />
        <AdoptFilter />
        <div>{adoptItems}</div>
      </React.Fragment>
    );
  }
}

export default Adopt;

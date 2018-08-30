import React, { Component, Fragment } from 'react';

//import assets

class Care extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      petBreeds: {}
    };
  }

  componentDidMount() {
    // on page load, get the user object if logged in
    if (sessionStorage.getItem('userId')) {
      const userId = sessionStorage.getItem('userId');
      if (userId) {
        fetch(`http://localhost:8080/user/${userId}/withpets`)
          .then(res => res.json())
          .then(res => {
            console.log(res);
            this.setState({ user: res.data.attributes });
            this.getUserPetBreeds();
          });
      }
    }
  }

  render() {
    return <Fragment>{this.renderPetCare()}</Fragment>;
  }

  getUserPetBreeds = () => {
    const petBreeds = {
      Cat: [],
      Dog: []
    };

    // loops through each pet to get their breed
    for (const pet of this.state.user.pets) {
      // splits up any mixed breeds into arrays
      const breedsArr = pet.breed.split(' and ');
      // loops through breeds array (of a single pet) and appends onto petBreeds obj
      for (let breed of breedsArr) {
        // if the breed does not exist in the
        if (!petBreeds[pet.animal].includes(breed)) {
          petBreeds[pet.animal].push(breed);
        }
      }
    }

    this.setState({ petBreeds });
  };

  renderPetCare = () => {
    if (!sessionStorage.getItem('userId')) {
      return <div>Login to See this Page!</div>;
    } else {
      // checks if the logged in user has a pet
      if (this.state.user.adopted) {
        return JSON.stringify(this.state.petBreeds);
      } else {
        return <div>Adopt a pet first!</div>;
      }
    }
  };
}

export default Care;

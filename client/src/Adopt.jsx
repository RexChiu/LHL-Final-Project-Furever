import React, { Component } from 'react';
//import assets

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
    fetch('http://localhost:8080/pets/test')
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
    const adoptItems = pets.map((pet, i) => (
      <div>
        <p> {pet.attributes.name} </p>
        <p> {pet.attributes.animal} </p>
        <p> {pet.attributes.contact.adress1} </p>
        <p> {pet.attributes.contact.city} </p>
        <p> {pet.attributes.contact.phone} </p>
        <p> {pet.attributes.contact.state} </p>
        <p> {pet.attributes.contact.zip} </p>
        <br />
      </div>
    ));

    return (
      <main>
        <p> Adopt Page </p>
        <div>{adoptItems}</div>
      </main>
    );
  }
}

export default Adopt;

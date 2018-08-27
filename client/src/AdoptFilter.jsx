import React, { Component } from 'react';
//import assets
const axios = require('axios');

class AdoptFilter extends Component {
  constructor(props) {
    super(props);
    // this.rerenderPets = this.rerenderPets.bind(this);
    this.state = { breed: '' };
  }

  change = event => {
    this.setState({ breed: event.target.value });
    console.log('log: ' + event.target.value);
  };

  filterSubmit = event => {
    event.preventDefault();
    const { rerenderPets } = this.props;

    axios
      .put(`http://localhost:8080/pets/filter`, {
        breed: `${this.state.breed}`
      })
      .then(function(response) {
        console.log('////////');
        console.log(JSON.stringify(response));
        rerenderPets(JSON.stringify(response));
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  render() {
    return (
      <section className="panel panel-default">
        <p>Filter</p>
        <form onSubmit={this.filterSubmit}>
          <select id="breed" onChange={this.change} value={this.state.breed}>
            <option value="persian">Persian</option>
            <option value="Tabby">Tabby</option>
            <option value="Domestic Long Hair">Domestic Long Hair</option>
            <option value="Chihuahua">Chihuahua</option>
            <option value="select" selected>
              Select
            </option>
          </select>
          <p>
            current value:
            {this.state.breed}
          </p>
          <input type="submit" value="submit" />
        </form>
      </section>
    );
  }
}

export default AdoptFilter;

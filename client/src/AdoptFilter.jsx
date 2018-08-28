import React, { Component } from 'react';
//import assets
const axios = require('axios');

class AdoptFilter extends Component {
  constructor(props) {
    super(props);
    // this.rerenderPets = this.rerenderPets.bind(this);
    this.state = {
      breed: '',
      age: ''
    };
  }

  change = event => {
    this.setState({ breed: event.target.value });
    console.log('log: ' + event.target.value);
  };

  changeAge = event => {
    this.setState({ age: event.target.value });
    console.log('log: ' + event.target.value);
  };

  filterSubmit = event => {
    event.preventDefault();
    const { rerenderPets } = this.props;

    axios
      .put(`http://localhost:8080/pets/filter`, {
        breed: `${this.state.breed}`,
        age: `${this.state.age}`
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

          <select id="age" onChange={this.changeAge} value={this.state.age}>
            <option value="Senior">Senior</option>
            <option value="Adult">Adult</option>
            <option value="Young">Young</option>
            <option value="Baby">Baby</option>
            <option value="select" selected>
              Select
            </option>
          </select>

          <p>
            current value:
            {this.state.breed}
            {this.state.age}
          </p>
          <input type="submit" value="submit" />
        </form>
      </section>
    );
  }
}

export default AdoptFilter;

import React, { Component } from 'react';
//import assets
const axios = require('axios');

class AdoptFilter extends Component {
  constructor(props) {
    super(props);
    this.state = { breed: 'select' };
  }

  change = event => {
    this.setState({ breed: event.target.value });
  };

  filterSubmit = event => {
    event.preventDefault;
    console.log(event.target.breed);
    axios
      .put(`http://localhost:8080/pet/`, {
        breed: event.target.breed.value.trim()
      })
      .then(function(response) {
        console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  render() {
    return (
      <section className="panel panel-default">
        <p>Filter</p>
        <form>
          <select id="breed" onChange={this.change}>
            <option value="persian">Persian</option>
            <option value="tabby">Tabby</option>
            <option value="fluffles">Fluffles</option>
            <option value="chihuahua">Chihuahua</option>
            <option value="select" selected>
              Select
            </option>
            <p>{this.state.value}</p>
          </select>
          <input onClick={this.filterSubmit} type="button" value="submit" />
        </form>
      </section>
    );
  }
}

export default AdoptFilter;

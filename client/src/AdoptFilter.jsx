import React, { Component } from 'react';
//import assets
const axios = require('axios');

class AdoptFilter extends Component {
  constructor(props) {
    super(props);
    // this.rerenderPets = this.rerenderPets.bind(this);
    this.state = {
      animal: '',
      size: '',
      sex: '',
      age: ''
    };
  }

  changeAnimal = event => {
    this.setState({ animal: event.target.value });
    console.log('log: ' + event.target.value);
  };

  changeSize = event => {
    this.setState({ size: event.target.value });
    console.log('log: ' + event.target.value);
  };

  changeSex = event => {
    this.setState({ sex: event.target.value });
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
        animal: this.state.animal,
        size: this.state.size,
        sex: this.state.sex,
        age: this.state.age
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
          <select id="animal" onChange={this.changeAnimal}>
            <option value="" hidden disabled selected>
              Animal
            </option>
            <option value="cat">Cat</option>
            <option value="dog">Dog</option>
          </select>

          <select id="size" onChange={this.changeSize}>
            <option value="" hidden disabled selected>
              Size
            </option>
            <option value="S">Small</option>
            <option value="M">Medium</option>
            <option value="L">Large</option>
            <option value="XL">XLarge</option>
          </select>

          <select id="sex" onChange={this.changeSex}>
            <option value="" hidden disabled selected>
              Sex
            </option>
            <option value="M">Male</option>
            <option value="F">Female</option>
          </select>

          <select id="age" onChange={this.changeAge}>
            <option value="" hidden disabled selected>
              Age
            </option>
            <option value="Baby">Baby</option>
            <option value="Young">Young</option>
            <option value="Adult">Adult</option>
            <option value="Senior">Senior</option>
          </select>

          <input type="submit" value="submit" />
        </form>
      </section>
    );
  }
}

export default AdoptFilter;

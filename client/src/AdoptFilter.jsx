import React, { Component } from 'react';
//import assets
const axios = require('axios');

class AdoptFilter extends Component {
  constructor(props) {
    super(props);
    // this.rerenderPets = this.rerenderPets.bind(this);
    this.state = {
      animal: '',
      sex: '',
      age: '',
      size: ''
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
    // no options selected, break
    if (!this.state.animal && !this.state.size && !this.state.sex && !this.state.age) {
      return;
    }

    const { rerenderPets } = this.props;

    // constructs output obj, only puts in the selected filters
    const outputObj = {};
    if (this.state.size !== '') {
      outputObj.size = this.state.size;
    }
    if (this.state.age !== '') {
      outputObj.age = this.state.age;
    }
    if (this.state.sex !== '') {
      outputObj.sex = this.state.sex;
    }
    if (this.state.animal !== '') {
      outputObj.animal = this.state.animal;
    }

    axios
      .put(`http://localhost:8080/pets/filter`, outputObj)
      .then(function(response) {
        console.log('////////');
        console.log(JSON.stringify(response));
        rerenderPets(JSON.stringify(response));
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  refreshPage = () => {
    window.location.reload();
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
            <option value="Cat">Cat</option>
            <option value="Dog">Dog</option>
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

          <select id="size" onChange={this.changeSize}>
            <option value="" hidden disabled selected>
              Size
            </option>
            <option value="S">Small</option>
            <option value="M">Medium</option>
            <option value="L">Large</option>
            <option value="XL">XLarge</option>
          </select>

          <input type="submit" value="submit" />
        </form>
        <button type="button" onClick={this.refreshPage}>
          Reset Filters
        </button>
      </section>
    );
  }
}

export default AdoptFilter;

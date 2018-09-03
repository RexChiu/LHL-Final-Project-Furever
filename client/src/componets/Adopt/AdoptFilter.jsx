import React, { Component } from 'react';
import { DropdownButton, MenuItem, ButtonToolbar } from 'react-bootstrap';

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

  render() {
    return (
      <section className="panel panel-default">
        <p>Filter</p>
        {this.renderDropdownButtons()}
      </section>
    );
  }

  renderDropdownButtons = () => {
    const animalTitle = this.state.animal !== '' ? this.state.animal : 'Animal';
    const sexTitle = this.state.sex !== '' ? this.state.sex : 'Sex';
    const ageTitle = this.state.age !== '' ? this.state.age : 'Age';
    const sizeTitle = this.state.size !== '' ? this.state.size : 'Size';

    return (
      <ButtonToolbar>
        <DropdownButton title={animalTitle} key="Animal" id="dropdown-animal" onSelect={this.changeAnimal}>
          <MenuItem eventKey="Cat">Cat</MenuItem>
          <MenuItem eventKey="Dog">Dog</MenuItem>
        </DropdownButton>
        <DropdownButton title={sexTitle} key="Sex" id="dropdown-sex" onSelect={this.changeSex}>
          <MenuItem eventKey="Male">Male</MenuItem>
          <MenuItem eventKey="Female">Female</MenuItem>
        </DropdownButton>
        <DropdownButton title={ageTitle} key="Age" id="dropdown-age" onSelect={this.changeAge}>
          <MenuItem eventKey="Baby">Baby</MenuItem>
          <MenuItem eventKey="Adult">Adult</MenuItem>
          <MenuItem eventKey="Young">Young</MenuItem>
          <MenuItem eventKey="Senior">Senior</MenuItem>
        </DropdownButton>
        <DropdownButton title={sizeTitle} key="Size" id="dropdown-size" onSelect={this.changeSize}>
          <MenuItem eventKey="S">S</MenuItem>
          <MenuItem eventKey="M">M</MenuItem>
          <MenuItem eventKey="L">L</MenuItem>
          <MenuItem eventKey="XL">XL</MenuItem>
        </DropdownButton>
      </ButtonToolbar>
    );
  };

  changeAnimal = (key, event) => {
    this.setState({ animal: key });
  };

  changeSize = (key, event) => {
    this.setState({ size: key });
  };

  changeSex = (key, event) => {
    this.setState({ sex: key });
  };

  changeAge = (key, event) => {
    this.setState({ age: key });
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
        rerenderPets(JSON.stringify(response), outputObj);
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  resetFilter = () => {
    this.props.resetFilter();
    window.location.reload();
  };
}

export default AdoptFilter;

/*
<form onSubmit={this.filterSubmit}>
  render() {
    return (
      <section id="adoptfilter" className="panel panel-default">
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
        <button type="button" onClick={this.resetFilter}>
          Reset Filters
        </button>
*/

import React, { Fragment, Component } from 'react';
import { DropdownButton, MenuItem, ButtonToolbar, Button } from 'react-bootstrap';

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
      <Fragment>
        <ButtonToolbar>
          <DropdownButton title={animalTitle} key="Animal" id="dropdown-animal" onSelect={this.changeAnimal}>
            <MenuItem eventKey="Cat">Cat</MenuItem>
            <MenuItem eventKey="Dog">Dog</MenuItem>
          </DropdownButton>
          <DropdownButton title={sexTitle} key="Sex" id="dropdown-sex" onSelect={this.changeSex}>
            <MenuItem eventKey="M">M</MenuItem>
            <MenuItem eventKey="F">F</MenuItem>
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
        <ButtonToolbar>
          <Button onClick={this.filterSubmit}>Submit</Button>
          <Button onClick={this.resetFilter}>Reset</Button>
        </ButtonToolbar>
      </Fragment>
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
    this.setState({
      animal: '',
      sex: '',
      age: '',
      size: ''
    });
    this.props.resetFilter();
  };
}

export default AdoptFilter;

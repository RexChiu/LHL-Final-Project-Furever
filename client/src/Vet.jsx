import React, { Component } from 'react';

const axios = require('axios');

class Vet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: '43.6446,-79.3950',
      type: 'veterinary_care',
      radius: 1500,
      keyword: 'pets',
      results: []
    };
  }

  retrieveVets = event => {
    event.preventDefault();

    // constructs output obj, only puts in the selected filters

    const outputObj = {};

    const { rerenderPets } = this.props;

    outputObj.location = this.state.location;
    outputObj.type = this.state.type;
    outputObj.radius = this.state.radius;
    outputObj.keyword = this.state.keyword;

    const component = this;
    axios
      .get(`http://localhost:8080/test/places`, outputObj)
      .then(function(response) {
        console.log('Client-Vet', response);

        const results = response.data.data.attributes.results;
        console.log('Name of Hospital', results);
        component.setState({ results });

        // console.log('This is the name', this.state.name);
        // console.log(JSON.stringify(response));
        // rerenderPets(JSON.stringify(response));
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  render() {
    console.log('Array', this.state.results);
    const hospital = this.state.results.slice(0);
    console.log('Ho', hospital instanceof Array);
    const hospitals = hospital.map(hospital => hospital.name);
    // const hospitals = 'Spadine';

    // let messages = this.props.messages.map(message => <Message key={message.id} message={message} />);

    return (
      <React.Fragment>
        <p> Vets in your area </p>
        <button type="button" onClick={this.retrieveVets}>
          Submit
        </button>
        <div>{hospitals}</div>
      </React.Fragment>
    );
  }
}

export default Vet;

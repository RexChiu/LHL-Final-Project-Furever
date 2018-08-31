import React, { Component } from 'react';

import Places from './Places';

const axios = require('axios');

class Vet extends Component {
  constructor(props) {
    super(props);
    //default values (LHL) if none are present
    this.state = {
      location: '43.6446,-79.3950',
      type: 'veterinary_care',
      radius: 1500,
      keyword: 'pets',
      results: []
    };
  }

  //Function to retrieve all the Vets or Hospitals in the area
  retrieveVets = event => {
    event.preventDefault();

    const userId = sessionStorage.getItem('userId');

    if (!userId) {
      alert('Need to Login First!');
      return;
    } else {
      // constructs output obj, only puts in the selected filters
      const outputObj = {};

      // const { rerenderPets } = this.props;

      //Concat the lat and long to send back to Google
      const location = sessionStorage.getItem('lat') + ',' + sessionStorage.getItem('lng');

      // Build the query parameters to be sent out by Axios to Server
      outputObj.location = location;
      outputObj.type = this.state.type;
      outputObj.radius = this.state.radius;
      outputObj.keyword = this.state.keyword;

      const component = this;
      axios
        .get(`http://localhost:8080/extras/places`, { params: outputObj })
        .then(function(response) {
          const results = response.data.data.attributes.results;
          component.setState({ results });
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  };

  render() {
    const hospital = this.state.results.slice(0);
    const hospitals = hospital.map(hospital => <Places place={hospital} />);
    return (
      <React.Fragment>
        <p> Vets in your area </p>
        <button type="button" onClick={this.retrieveVets}>
          Submit
        </button>
        <div>
          <table class="table table-striped">
            <thead>
              <tr>
                <th className="col-m">Hospital Name</th>
                <th className="col-sm">Hospital Rating</th>
                <th className="col-sm">Hospital Rating</th>
              </tr>
            </thead>
            <tbody>{hospitals}</tbody>
          </table>
        </div>
      </React.Fragment>
    );
  }
}

export default Vet;

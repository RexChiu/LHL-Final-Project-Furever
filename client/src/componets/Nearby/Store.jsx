import React, { Fragment, Component } from 'react';

import Places from './Places';

const axios = require('axios');

class Store extends Component {
  constructor(props) {
    super(props);
    //default values (LHL) if none are present
    this.state = {
      location: '43.6446,-79.3950',
      type: 'pet_store',
      radius: 1500,
      keyword: 'pets',
      results: [],
      isLoaded: false
    };
  }

  //Function to retrieve all the Vets or Hospitals in the area
  componentDidMount() {
    // constructs output obj, only puts in the selected filters
    const outputObj = {};

    //Concat the lat and long to send back to Google
    const location = sessionStorage.getItem('lat') + ',' + sessionStorage.getItem('lng');

    // Build the query parameters to be sent out by Axios to Server
    outputObj.location = location;
    outputObj.type = this.props.type;
    outputObj.radius = this.state.radius;
    outputObj.keyword = this.state.keyword;

    const component = this;
    axios
      .get(`http://localhost:8080/extras/places`, { params: outputObj })
      .then(function(response) {
        const results = response.data.data.attributes.results;
        component.props.isLoaded();
        component.setState({ results, isLoaded: true });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  render() {
    const place = this.state.results.slice(0);
    let id = 0;
    const places = place.map(place => <Places place={place} key={id++} />);
    if (this.state.isLoaded) {
      return (
        <Fragment>
          <h3>{this.props.establishment}s in your area</h3>
          <hr />
          <div>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th className="col-m-4">{this.props.establishment} Name</th>
                  <th className="col-sm-4 text-center">{this.props.establishment} Rating</th>
                  <th className="col-sm-4 text-center">{this.props.establishment} Availability</th>
                </tr>
              </thead>
              <tbody>{places}</tbody>
            </table>
          </div>
        </Fragment>
      );
    }
    return '';
  }
}

export default Store;

import React, { Component } from 'react';
//import assets

import AdoptFilter from './AdoptFilter';
import SearchUI from './SearchUI';

class Adopt extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      pets: []
    };
  }

  componentDidMount() {
    //code I added in will link to server
    fetch('http://localhost:8080/pets')
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            isLoaded: true,
            pets: result.data
          });
        },

        error => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      );
  }

  render() {
    const { pets } = this.state;
    const adoptItems = pets.map((pet, i) => (
      <section>
        <div className="col-sm-4">
          <div className="adoptitem panel panel-default">
            <p> name </p>
            <p> type </p>

            <button id="myBtn"> Adopt </button>
          </div>
        </div>

        <div id="myModal" className="modal">
          <div className="modal-content">
            <span className="close">&times;</span>
            <p>Some text in the Modal..</p>
          </div>
        </div>
      </section>
    ));

    return (
      <React.Fragment>
        <p> Adopt Page </p>
        <SearchUI />
        <AdoptFilter />
        <div>{adoptItems}</div>
      </React.Fragment>
    );
  }
}

export default Adopt;

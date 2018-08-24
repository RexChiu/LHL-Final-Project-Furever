import React, { Component } from 'react';

import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'


//          Adopt and Events
import Navbar from './Navbar.jsx'
import './App.css';





class App extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        error: null,
        isLoaded: false,
        pets: []
      };
    }

// $.ajax({
//   url: "test.html",
//   context: document.body
//   }).done(function() {
//   $( this ).addClass( "done" );
// });

  componentDidMount() {
  //code I added in will link to server
  fetch("http://localhost:8080/pets")
    .then(res => res.json())
    .then(
      (result) => {
        this.setState({
          isLoaded: true,
          pets: result.data
        });
      },

      (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }






//       //              RENDERING
  render() {
    const { pets } = this.state

    return (

      <div className="App">
        <Navbar />
        <div>
          {pets && pets.map((pet, i) =>
            // <li key={i}>{pet.type}</li>
            // <li key={i}>{pet.id}</li>
            // <p> {pet.type} </p>
            <p> {pet.attributes.name} </p>
            )}
        </div>
      </div>




    );
  }
}


export default App;

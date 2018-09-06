import React, { Fragment, Component } from 'react';
const axios = require('axios');

class Pet extends Component {
  render() {
    // if not logged in, do not show the adopt button.
    let adoptButton = '';
    if (sessionStorage.getItem('userId')) {
      adoptButton = (
        <a onClick={this.handleSubmit} value={this.props.pet.id} className="btn btn-lg btn-primary" data-dismiss="modal">
          Adopt
        </a>
      );
    }

    return (
      <Fragment>
        <div className="adoptitem panel panel-default" data-toggle="modal" href={'#petDetails' + this.props.pet.id}>
          <img className="img-responsive pet-image" src={this.props.pet.attributes.photos[0]} alt="notWorking" id="mouseUI" />
          <div className="pet-info">
            <p> Name: {this.props.pet.attributes.name} </p>
            <p> Breed: {this.props.pet.attributes.breed} </p>
            <p> Age: {this.props.pet.attributes.age} </p>
          </div>
        </div>
        {/*                   MODAL                     */}
        <div id={'petDetails' + this.props.pet.id} className="modal fade">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal" aria-hidden="true">
                  &times;
                </button>
                <h4 className="modal-title">{this.props.pet.attributes.name}</h4>
              </div>
              <div className="modal-body">
                <img src={this.props.pet.attributes.photos} alt="notWorking" />
                <p />
                <p> Breed: {this.props.pet.attributes.breed} </p>
                <p> Age: {this.props.pet.attributes.age} </p>
                <p className="text-warning">
                  Description: <small> {this.props.pet.attributes.description} </small>
                </p>
                <p>
                  Contact Info: {this.props.pet.attributes.contact.phone}, {this.props.pet.attributes.contact.email}{' '}
                </p>
                <p>
                  Address: {this.props.pet.attributes.contact.address1}, {this.props.pet.attributes.contact.zip}, {this.props.pet.attributes.contact.city},{' '}
                  {this.props.pet.attributes.contact.state}{' '}
                </p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-default" data-dismiss="modal">
                  Close
                </button>
                {adoptButton}
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }

  handleSubmit = event => {
    event.preventDefault();
    if (sessionStorage.getItem('userId') === null) {
      alert('Need to Login First!');
      return;
    }
    axios
      .post(`http://localhost:8080/pet/${this.props.pet.id}/adopt`, {
        userId: `${sessionStorage.getItem('userId')}`,
        petId: `${this.props.pet.id}`
      })
      .then(response => {
        // successful adoption, set adopted to be true on client side
        // show clippy to prompt other pages, get new list of pets
        sessionStorage.setItem('adopted', true);
        this.props.showClippy(true, 'adopted');
        this.props.getPets();
        window.scrollTo(0, 0);
      })
      .catch(function(error) {
        console.log(error);
      });
  };
}
export default Pet;

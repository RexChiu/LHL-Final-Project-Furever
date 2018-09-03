import React, { Fragment, Component } from 'react';
const axios = require('axios');

class Pet extends Component {
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
      .then(function(response) {
        console.log(response);
        window.location.reload();
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  render() {
    return (
      <Fragment>
        <div className="col-sm-4" data-toggle="modal" href={'#petDetails' + this.props.pet.id}>
          <div className="adoptitem panel panel-default">
            <img className="img-responsive" src={this.props.pet.attributes.photos[0]} alt="notWorking" id="mouseUI" />
            <div className="pet-info">
              <p> Name: {this.props.pet.attributes.name} </p>
              <p> Breed: {this.props.pet.attributes.breed} </p>
              <p> Age: {this.props.pet.attributes.age} </p>
            </div>
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
                <h4 className="modal-title">Confirmation</h4>
              </div>
              <div className="modal-body">
                <img src={this.props.pet.attributes.photos} alt="notWorking" />
                <p> {this.props.pet.attributes.animal} </p>
                <p> {this.props.pet.attributes.breed} </p>
                <p> {this.props.pet.attributes.age} </p>

                <p>
                  {' '}
                  {this.props.pet.attributes.contact.address1}, {this.props.pet.attributes.contact.zip}, {this.props.pet.attributes.contact.city},{' '}
                  {this.props.pet.attributes.contact.state}{' '}
                </p>

                <p className="text-warning">
                  <small> {this.props.pet.attributes.description} </small>
                </p>
                <p>
                  {' '}
                  {this.props.pet.attributes.contact.phone}, {this.props.pet.attributes.contact.email}{' '}
                </p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-default" data-dismiss="modal">
                  Close
                </button>

                <a onClick={this.handleSubmit} value={this.props.pet.id} className="btn btn-lg btn-primary">
                  Adopt
                </a>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}
export default Pet;

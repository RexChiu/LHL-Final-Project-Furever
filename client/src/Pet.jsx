import React, { Component } from 'react';
const axios = require('axios');

class Pet extends Component {
  // constructor(props) {
  //   super(props);
  //   this.handleSubmit = this.handleSubmit.bind(this);
  // }

  // handleSubmit = event => {
  //   event.preventDefault();
  //   console.log(event.value);
  //   fetch(`http://localhost:8080/users/${this.props.pet.id}/adopt`, {
  //     method: 'POST',
  //     body: JSON.stringify({
  //       id: 'LKrbAGsDo6KsWQ-7reg'
  //     })
  //   });
  // };

  handleSubmit = event => {
    axios
      .post(`http://localhost:8080/pet/${this.props.pet.id}/adopt`, {
        userId: `${this.props.userId}`,
        petId: `${this.props.pet.id}`
      })
      .then(function(response) {
        console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  render() {
    return (
      <React.Fragment>
        <section>
          <div className="col-sm-4" data-toggle="modal" href={'#petDetails' + this.props.pet.id}>
            <div className="adoptitem panel panel-default">
              <img
                src={this.props.pet.attributes.media ? this.props.pet.attributes.media.photos.photo[2] : 'https://i.imgur.com/I4y3r3l.jpg'}
                alt="notWorking"
                id="mouseUI"
              />
              <p> {this.props.pet.attributes.animal} </p>
              <p> {this.props.pet.attributes.breeds.breed} </p>
              <p> {this.props.pet.attributes.age} </p>
            </div>
          </div>
          {/*                   MODAL                     */}

          <div id={'petDetails' + this.props.pet.id} class="modal fade">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                    &times;
                  </button>
                  <h4 class="modal-title">Confirmation</h4>
                </div>
                <div class="modal-body">
                  <img
                    src={this.props.pet.attributes.media ? this.props.pet.attributes.media.photos.photo[2] : 'https://i.imgur.com/I4y3r3l.jpg'}
                    alt="notWorking"
                  />
                  <p> {this.props.pet.attributes.animal} </p>
                  <p> {this.props.pet.attributes.breeds.breed} </p>
                  <p> {this.props.pet.attributes.age} </p>
                  <p>
                    {' '}
                    {this.props.pet.attributes.contact.address1}, {this.props.pet.attributes.contact.city}, {this.props.pet.attributes.contact.state}{' '}
                  </p>
                  <p>Do you want to save changes you made to document before closing?</p>
                  <p class="text-warning">
                    <small>If you don't save, your changes will be lost.</small>
                  </p>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-default" data-dismiss="modal">
                    Close
                  </button>

                  <a onClick={this.handleSubmit} value={this.props.pet.id} class="btn btn-lg btn-primary">
                    Adopt
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </React.Fragment>
    );
  }
}
export default Pet;

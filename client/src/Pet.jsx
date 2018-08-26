import React, { Component } from 'react';

class Pet extends Component {
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
    return (
      <React.Fragment>
        <section>
          <div className="col-sm-4" data-toggle="modal" href={'#petDetails' + this.props.pet.id}>
            <div className="adoptitem panel panel-default">
              <img src={this.props.pet.attributes.photos[2]} alt="notWorking" id="mouseUI" />
              <p> {this.props.pet.attributes.animal} </p>
              <p> {this.props.pet.attributes.breed} </p>
              <p> {this.props.pet.attributes.age} </p>

              <a class="btn btn-lg btn-primary">Adopt</a>
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
                  <img src={this.props.pet.attributes.photos[2]} alt="notWorking" />
                  <p> {this.props.pet.attributes.animal} </p>
                  <p> {this.props.pet.attributes.breed} </p>
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

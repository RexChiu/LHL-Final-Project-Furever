import React, { Component, Fragment } from 'react';
import ReactLoading from 'react-loading';

//import assets

class Care extends Component {
  constructor(props) {
    super(props);
    this.state = {
      breedInfo: '',
      isLoaded: false
    };

    // not logged in, redirect to home page
    if (!sessionStorage.getItem('userId')) {
      alert('Unauthorized Access! Login First!');
      this.props.history.push('/');
    }
    // does not have a pet, redirect to adopt page
    if (sessionStorage.getItem('adopted') === 'false') {
      alert('Unauthorized Access! Adopt a pet First!');
      this.props.history.push('/adopt');
    }
  }

  componentDidMount() {
    // on page load, get the user object if logged in
    if (sessionStorage.getItem('userId')) {
      const userId = sessionStorage.getItem('userId');
      const adopted = sessionStorage.getItem('adopted');
      // sends API request to get the pet care of the user if they have pets
      if (adopted === 'true') {
        fetch(`http://localhost:8080/extras/care/${userId}`)
          .then(res => res.json())
          .then(res => {
            this.setState({ breedInfo: res.data.attributes, isLoaded: true });
            console.log(this.state.breedInfo);
          })
          .catch(err => alert(err));
      }
    }
  }

  render() {
    return <Fragment>{this.renderPetCare()}</Fragment>;
  }

  renderPetCare = () => {
    if (!sessionStorage.getItem('userId')) {
      return 'Please Login to see this page!';
    } else {
      // render only if adopted
      if (sessionStorage.getItem('adopted') === 'true') {
        // render only if pet care info is loaded
        if (this.state.isLoaded) {
          return <div className="jumbotron">{this.renderBreedsInfo()}</div>;
        } else {
          return (
            <Fragment>
              <strong>Loading...</strong>
              <ReactLoading className="loading-icon" type={'spinningBubbles'} color={'#000000'} height={'10%'} width={'10%'} />
            </Fragment>
          );
        }
      } else {
        return 'Adopt a Pet first!';
      }
    }
  };

  renderBreedsInfo = () => {
    let catInfo = [];
    let dogInfo = [];

    for (let catBreed of this.state.breedInfo.cat) {
      let html = '';
      html += `<h2>${catBreed.breed}</h2>`;
      html += catBreed.image;
      html += catBreed.personality;
      html += catBreed.traits;
      catInfo.push(
        <Fragment>
          <hr />
          <div className="breed-info" dangerouslySetInnerHTML={{ __html: html }} />
        </Fragment>
      );
    }
    for (let dogBreed of this.state.breedInfo.dog) {
      let html = '';
      html += `<h2>${dogBreed.breed}</h2>`;
      html += dogBreed.image;
      html += dogBreed.temperment;
      html += dogBreed.care;
      html += dogBreed.health;
      dogInfo.push(
        <Fragment>
          <hr />
          <div className="breed-info" dangerouslySetInnerHTML={{ __html: html }} />
        </Fragment>
      );
    }

    return (
      <Fragment>
        <h1>Pet Care Information</h1>
        <h3>Personalized list of pet care information for your pets.</h3>
        {catInfo}
        {dogInfo}
      </Fragment>
    );
  };
}

export default Care;

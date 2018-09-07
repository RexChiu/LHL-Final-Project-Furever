import React, { Component, Fragment } from 'react';
import ReactLoading from 'react-loading';

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

    // empty clippy, scroll to top
    this.props.showClippy(false, 'empty');
    window.scrollTo(0, 0);
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
            const breeds = this.getBreeds();
            this.props.showClippy(true, 'care', breeds);
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

  // renders the array of cat and dog breed info (already in HTML tags from server)
  renderBreedsInfo = () => {
    let catInfo = [];
    let dogInfo = [];

    // goes through the list of Cat breed info HTML and constructs and array of Cat info
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
    // same thing as above
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

    // shows the constructed cat and dog care info
    return (
      <Fragment>
        <h1>Pet Care Information</h1>
        <h3>Personalized list of pet care information for your pets.</h3>
        {catInfo}
        {dogInfo}
      </Fragment>
    );
  };

  getBreeds = () => {
    const breeds = [];
    for (let cat of this.state.breedInfo.cat) {
      breeds.push(cat.breed);
    }
    for (let dog of this.state.breedInfo.dog) {
      breeds.push(dog.breed);
    }

    const outputObj = breeds.slice(0, breeds.length - 1);
    return outputObj.join(', ') + ' and ' + breeds[breeds.length - 1];
  };
}

export default Care;

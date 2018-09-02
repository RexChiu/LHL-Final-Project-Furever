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
      return <div>Login to See this Page!</div>;
    } else {
      // render only if adopted
      if (sessionStorage.getItem('adopted')) {
        // render only if pet care info is loaded
        if (this.state.isLoaded) {
          return this.renderBreedsInfo();
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
      html += catBreed.personality;
      html += catBreed.traits;
      catInfo.push(<div className="breed-info" dangerouslySetInnerHTML={{ __html: html }} />);
    }
    for (let dogBreed of this.state.breedInfo.dog) {
      let html = '';
      html += dogBreed.temperment;
      html += dogBreed.care;
      html += dogBreed.health;
      dogInfo.push(<div className="breed-info" dangerouslySetInnerHTML={{ __html: html }} />);
    }

    return (
      <Fragment>
        {catInfo}
        {dogInfo}
      </Fragment>
    );
  };
}

export default Care;

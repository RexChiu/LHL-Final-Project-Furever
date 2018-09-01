import React, { Component } from 'react';

class PetCarousel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      slides: null
    };
  }

  loadSlides = () => {
    this.setState({
      slides: baseChildren.props.children
    });
  };

  render() {
    return (
      <div>
        <button onClick={this.loadSlides}>Load slides</button>
        <Carousel>{this.state.slides}</Carousel>
      </div>
    );
  }
}

export default PetCarousel;

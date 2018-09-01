import React, { PropTypes, Component } from 'react';
import ReactDOM from 'react-dom';
import { Carousel } from 'react-responsive-carousel';

// general styles
import 'style!css!react-responsive-carousel/lib/styles/main.css';

// carousel styles
import 'style!css!react-responsive-carousel/lib/styles/carousel.css';

class DemoCarousel extends Component {
  render() {
    return (
      <Carousel showArrows={true}>
        <div>
          <img src="http://lorempixel.com/900/500/sports/1/" />
          <p className="legend">Legend 1</p>
        </div>
      </Carousel>
    );
  }
}

ReactDOM.render(<DemoCarousel />, document.querySelector('.demo-carousel'));

// Don't forget to include the css in your page
// <link rel="stylesheet" href="carousel.css"/>
// Begin DemoSliderControls

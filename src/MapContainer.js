import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';
import PropTypes from 'prop-types';
import { key } from './key';

const mapStyles = {
  width: '100%',
  height: '100%'
};

class MapContainer extends Component {
  static propTypes = {
    google: PropTypes.object,
    zoom: PropTypes.number,
    initialCenter: PropTypes.object
  };

  state = {
    places: this.props.places,
    clicked: {},
    showClicked: false,
    activeIndex: -1,
    activePlace: {}
  };

  
  componentWillReceiveProps(nextProps) {
    console.log('nextProps ', nextProps);
    /*  update state with new places if they've changed */
    if (nextProps.places !== this.state.places) {
      this.setState({
        places: nextProps.places
      });
    }

    /* if the clicked prop has changed then update it in state */
    if (nextProps.clicked !== this.state.clicked) {
      this.setState({
        clicked: nextProps.clicked,
        showClicked: true
      });
    } 

    /* if activeIndex has changed then update it in state */
    if (nextProps.activeIndex !== this.state.activeIndex) {
      this.setState({
        activeIndex: nextProps.activeIndex
      });
    }
  }

  onMarkerClicked = (props, marker, e) => {
    this.setState({
      activeMarker: marker,
      showClicked: true
    });
  }

  markerAnimation(currentIndex) {
    if (this.state.activeIndex === currentIndex) {
      return 1;
    }
  }

  render() {
    const { places, showClicked, activeMarker } = this.state;
    return (
      <Map onChange={this.props.onChange}
           google={this.props.google}
           zoom={14}
           style={mapStyles}
           initialCenter={{
             lat: 41.9027835,
             lng: 12.4963655
           }} 
           role="application">
        <Marker title={'Rome, Italy'} name={'Current Location'} />
        {places && places.map((place, index) => (
          <Marker key={index}
                  onClick={this.onMarkerClicked}
                  title={place.name}
                  name={place.name}
                  categories={place.categories ? place.categories.map(c => c.name) : 'no categories found'}
                  position={{lat: place.location.lat, lng: place.location.lng}}
                  animation={this.markerAnimation(index)} />
        ))}          


        <InfoWindow
          marker={this.state.activeMarker}
          visible={showClicked}>
          <div aria-hidden="false" role="presentation">
            <span style={{fontWeight: 'bold'}}>{ activeMarker && activeMarker.name ? activeMarker.name : ''}</span><br />
            <span>{ activeMarker && activeMarker.categories ? activeMarker.categories.map(c => c) : 'no categories found'}</span>
          </div>
        </InfoWindow>
      </Map>     
    )
  }
}

export default GoogleApiWrapper({
  // apiKey: key
  apiKey: 'sklksjdlkj'
})(MapContainer);
import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';
import PropTypes from 'prop-types';
import { key } from './key';

const mapStyles = {
  width: '100%',
  height: '100%'
};

// const locations = [];
// const Listing = ({ places }) => (
//   <ul>{places && places.map(p => <li key={p.id}>{p.name}</li>)}</ul>
// );

class MapContainer extends Component {
  static propTypes = {
    google: PropTypes.object,
    zoom: PropTypes.number,
    initialCenter: PropTypes.object
  };

  state = {
    places: this.props.places,
    // clicked: this.props.clicked,
    clicked: {},
    // activeMarker: -1,
    showClicked: false,
    activeIndex: -1
  };

  componentWillReceiveProps(nextProps) {
    console.log('nextProps ', nextProps);
    if (nextProps.places !== this.state.places) {
      this.setState({
        places: nextProps.places
      });
    }

    if(nextProps.clicked !== this.state.clicked) {
      this.setState({
        clicked: nextProps.clicked,
        showClicked: true
      });
      console.log('this.state.clicked ', this.state.clicked);
    } 

    if (nextProps.activeIndex !== this.state.activeIndex) {
      this.setState({
        activeIndex: nextProps.activeIndex
      });
    }
  }

  onMarkerClicked = (/*props, marker, e*//*idx*/) => {
    // console.log('idx ', idx);
    // this.setState({
    //   // clicked: marker,
    //   activeMarker: marker,
    //   showClicked: true
    // });
    // this.setState({
    //   activeMarker: idx
    // });
    this.setState({
      showClicked: true
    });
    console.log('this.state ', this.state);
  }

  render() {
    const { google } = this.props;
    const { places, clicked, showClicked, activeIndex } = this.state;
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
                  onClick={() => this.onMarkerClicked()}
                  title={place.name} 
                  name={place.name} 
                  position={{lat: place.location.lat, lng: place.location.lng}}
                  animation={(activeIndex !== index || activeIndex === -1) ? 0 : 1}>

              {this.state.showClicked && (
                <div style={{
                  position: 'absolute',
                  border: '3px solid blue',
                  zIndex: 100
                }}>Blah!</div>
                          // <InfoWindow>
                          //   <div>
                          //     {/* <p>{place.name}</p> */}
                          //     <p>blah1</p>
                          //     {/* <span>{place.location.address}, {place.location.city}, {place.location.country}</span> */}
                          //     <span>blah2</span>
                          //   </div>
                          // </InfoWindow>
              )}

          </Marker>          
        ))}
      </Map>     
    )
  }
}

export default GoogleApiWrapper({
  apiKey: key,
  libraries: ['places']
})(MapContainer);
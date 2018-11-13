import React, { Component } from 'react';
import './App.css';
import SearchPage from './SearchPage';
import MapContainer from './MapContainer';
import { /*load_google_maps, getPlaces, */getFoursquarePlaces } from './utils';
import escapeRegExp from 'escape-string-regexp';

class App extends Component {

  state = {
    query: '',
    places: [],
    clicked: {},
    activeIndex: -1
  };

  handleChange = event => {
    console.log('here')
    this.setState({
      'query': event.target.value
    });
  }

  // updatePlaces = event => {
  //   console.log('something');
  //   console.log('event.target.value ', event.target.value);
  //   // this.setState({
  //   //   clicked: event.target.value
  //   // });
  //   console.log('places ', this.state.places);
  // }

  componentDidMount() {
    // let maps = load_google_maps();
    // let yelp = getPlaces();

    // Promise.all([
    //   maps,
    //   yelp
    // ])
    // .then(vals => {
    //   console.log('vals', vals);
    // });
    /*
    Promise.race(
      places
    )
    .then(results => console.log('results ', results));*/
    // let placesPromise = new Promise((resolve, reject) => {
    //   places();
    //   resolve('something');
    // }).then(function(res) {
    //   console.log('res ', res);
    // });

    /* gets the featured places in the current location and sets the state with those places */ 
    getFoursquarePlaces()
      .then(response => {
        const places = response.response.groups[0].items.map(place => place.venue);
        places.forEach(place => place['showPlaceData'] = false);
        this.setState({
          places: places
        });
      });
  }

  clicked = place => {
    this.setState({
      clicked: place
    });
  }

  activeIndex = index => {
    this.setState({
      activeIndex: index
    });
  }

  render() {
    let filteredPlaces;
    const { query, places } = this.state;

    if (query) {
      const match = new RegExp(escapeRegExp(query), 'i');
      /*
      Filter places based on the place's name and every category
      */
      filteredPlaces = places.filter(place => place.categories.every(c => match.test(c.name)) || match.test(place.name));
    } else {
      filteredPlaces = places.slice(); // copy the places as is
    }

    return (
      <div className="App">
        <div className="search">
          <SearchPage places={filteredPlaces || this.state.places} onChange={(event) => {
            this.handleChange(event)
            }}
            clicked={this.clicked}
            activeIndex={this.activeIndex}
              />
        </div>
        <div id="map" className="map">
          <MapContainer places={filteredPlaces || this.state.places} 
                        query={this.state.query}
                        clicked={this.state.clicked}
                        activeIndex={this.state.activeIndex}
          />
        </div>
      </div>
    );
  }
}

export default App;

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './SearchPage.css';

class SearchPage extends Component {
  static propTypes = {
    query: PropTypes.string
  };

  state = {
    places: this.props.places,
    showPlaceData: false,
    clicked: '',
    activeIndex: -1
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.places !== this.state.places) {
      this.setState({
        places: nextProps.places
      });
    }
  }

  displayPlaceData = (place, ind) => {
    const { clicked, activeIndex } = this.props;
    const cloned = this.state.places.slice();
    let index = ind;

    if (this.state.activeIndex !== -1 && this.state.activeIndex !== ind) {
      cloned[this.state.activeIndex].showPlaceData = false;

    } else if (this.state.activeIndex === ind) {
      index = -1;
      // cloned[ind].showPlaceData = !cloned[ind].showPlaceData;
    }
    cloned[ind].showPlaceData = !cloned[ind].showPlaceData;
    clicked(place);
    activeIndex(index);
    this.setState({
      places: cloned,
      clicked: place,
      activeIndex: ind
    });
  }

  render() {
    const { places } = this.state;
    return (
      <div className="searchContainer">
        <input id="search"
               aria-label="Search the neighborhood"
               name="search"
               type="text" 
               placeholder="Enter a place or category" 
               value={this.props.query}
               onChange={this.props.onChange}
        />
        <div className="placesList">
          <h3 id="places_lbl">Places: </h3>
          {places && places.length > 0 && (
              <ul aria-labelledby="places_lbl" role="presentation">
                {places.map((place, indx) => (
                  <li key={indx} onClick={() => {
                    this.displayPlaceData(place, indx)
                  }}>
                  <span style={{
                    fontWeight: 'bold'
                  }}>{place.name}</span>
                  {place.showPlaceData && (
                    <div className="place_info">
                      <span>Categories: {place.categories ? place.categories.map(c => c.name) : 'no categories found'}<br /></span>
                      <span>Address: {place.location.address}, {place.location.city}, {place.location.country}</span>
                    </div>
                  )}
                  </li>
                ))}
              </ul>
          )}
        </div>
      </div>
    )
  }
}

export default SearchPage;
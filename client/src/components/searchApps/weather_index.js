import React, { Component } from 'react';
import SearchBar from '../../containers/searchBar';
import WeatherList from '../../containers/weather_list';

class WeatherIndex extends Component {
  render() {
    return (
      <div>
        <SearchBar />
        <WeatherList />
      </div>
    );
  }
}

export default WeatherIndex;

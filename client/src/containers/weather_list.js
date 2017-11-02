import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
// import {bindActionCreators} from 'redux';
// import {fetchWeather} from '../actions/fetchWeather_action';
import Chart from '../components/chart';

import Mapper from '../components/searchApps/map';

class WeatherList extends Component {
  renderWeather(cityData) {
    const name = cityData.city.name;
    const temp = cityData.list.map(weather => weather.main.temp);
    const pressure = cityData.list.map(weather => weather.main.pressure);
    const humidity = cityData.list.map(weather => weather.main.humidity);
    const lon = cityData.city.coord.lon;
    const lat = cityData.city.coord.lat;
    console.log(lon);
    // const {lon, lat} = cityData.city.coord;

    return (
      <tr key={name}>
        <td>
          <Mapper lon={lon} lat={lat} />
        </td>
        <td>
          <Chart data={temp} color="orange" units="K" />
        </td>
        <td>
          <Chart data={pressure} color="red" units="HPA" />
        </td>
        <td>
          <Chart data={humidity} color="blue" units="%" />
        </td>
      </tr>
    );
  }
  render() {
    if (this.props.weather === undefined) {
      return <div>Search for a city to generate the table.</div>;
    }

    return (
      <div>
        <table className="table table-hover">
          <thead>
            <tr>
              <th> City </th>
              <th> Temperature (K)</th>
              <th> Pressure (HPA) </th>
              <th> Humidity (%) </th>
            </tr>
          </thead>
          <tbody>{this.props.weather.map(this.renderWeather)}</tbody>
        </table>
        <br />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    weather: state.weather
  };
}
    
// function mapStateToProps({weather}){
//     return {
//         weather
//     };
// }

// function mapDispatchToProps(dispatch){
//     return bindActionCreators({fetchWeather: fetchWeather}, dispatch);
// }

export default connect(mapStateToProps)(WeatherList);

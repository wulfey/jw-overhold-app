import React from 'react';
import {Component} from 'react';
// import {GoogleMapLoader, GoogleMap} from 'react-google-maps';
import { withGoogleMap, GoogleMap, Marker } from "react-google-maps";
// import _ from "lodash";


// export default class Mapper extends Component {
//     render() {

//         return (
            
//             <GoogleMap
//             containerElement={<div style={{height: '100%'}} /> }
//             googleMapElement={
//                 <GoogleMap defaultZoom={12} defaultCenter={{lat: this.props.lat, lng: this.props.lon}} />
//             }

//             />
//         )
//     }
// }


// // Wrap all `react-google-maps` components with `withGoogleMap` HOC
// // and name it GettingStartedGoogleMap

const GettingStartedGoogleMap = withGoogleMap(props => (
  
  <GoogleMap
    ref={props.onMapLoad}
    defaultZoom={3}
    defaultCenter={{ lat: props.lat, lng: props.lng }}
    onClick={props.onMapClick}
  >
    {props.markers.map(marker => (
      <Marker
        {...marker}
        onRightClick={() => props.onMarkerRightClick(marker)}
      />
    ))}
  </GoogleMap>
));

export default class Mapper extends Component {

  constructor(props) {
    super(props);

    this.state = {
        markers: [{
        position: {
            lat: this.props.lat,
            lng: this.props.lon,
        },
        key: `Taiwan`,
        defaultAnimation: 2,
        }],
    };

  }


  handleMapLoad = this.handleMapLoad.bind(this);
  handleMapClick = this.handleMapClick.bind(this);
  handleMarkerRightClick = this.handleMarkerRightClick.bind(this);

  handleMapLoad(map) {
    this._mapComponent = map;
    if (map) {
      console.log(map.getZoom());
    }
  }

  /*
   * This is called when you click on the map.
   * Go and try click now.
   */
  handleMapClick(event) {
    const nextMarkers = [
      ...this.state.markers,
      {
        position: event.latLng,
        defaultAnimation: 2,
        key: Date.now(), // Add a key property for: http://fb.me/react-warning-keys
      },
    ];
    this.setState({
      markers: nextMarkers,
    });

    if (nextMarkers.length === 3) {
      this.props.toast(
        `Right click on the marker to remove it`,
        `Also check the code!`
      );
    }
  }

  handleMarkerRightClick(targetMarker) {
    /*
     * All you modify is data, and the view is driven by data.
     * This is so called data-driven-development. (And yes, it's now in
     * web front end and even with google maps API.)
     */
    const nextMarkers = this.state.markers.filter(marker => marker !== targetMarker);
    this.setState({
      markers: nextMarkers,
    });
  }

  render() {
      console.log(this.props.lat);
    return (
      <div style={{height: `100%`}}>

        <GettingStartedGoogleMap
          lat={this.props.lat}
          lng={this.props.lon}
          
          containerElement={
            <div style={{ height: `100%` }} />
          }
          mapElement={
            <div style={{ height: `100%` }} />
          }
          onMapLoad={this.handleMapLoad}
          onMapClick={this.handleMapClick}
          markers={this.state.markers}
          onMarkerRightClick={this.handleMarkerRightClick}
        />
      </div>
    );
  }
}
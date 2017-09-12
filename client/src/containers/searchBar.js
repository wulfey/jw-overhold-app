import React, { Component } from "react";

// these are boilerplate templates for linking a CONTAINER from ACTIONS to STORE
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchWeather } from "../actions/index";

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      term: ""
    };
    // bind this is much better and stronger than passinv events
    // this is way more REACT and less JS
    this.onInputChange = this.onInputChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  onInputChange(event) {
    // console.log(event.target.value);
    this.setState({ term: event.target.value });
  }

  onFormSubmit(event) {
    // console.log(event);
    // block submission
    event.preventDefault();
    this.props.fetchWeather(this.state.term);
    this.setState({ term: "" });

    // need to go fetch weather data

    // df3ec8ca157b3afcdfbec8c5d72efb0f
    // api.openweathermap.org/data/2.5/forecast?q={city name},{country code}
  }

  render() {
    return (
      <div>
        <p> Weather Searchbar</p>
        <form onSubmit={this.onFormSubmit} className="input-group">
          <input
            placeholder="Get a five-day forecast in fav cities."
            className="form-control"
            value={this.state.term}
            onChange={this.onInputChange}
          />
          <span className="input-group-btn">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </span>
        </form>
      </div>
    );
  }
}

// this will bind fetchWeather to the PROPS of searchBar, so that
// within searchBar class, you can call this.props.fetchWeater(city)
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchWeather }, dispatch);
}
export default connect(null, mapDispatchToProps)(SearchBar);

// class SearchBar extends Component {

//     constructor(props){
//         super(props)
//         this.state = {
//             term: 'warhammer',
//             // searchResults: [],
//         }
//     }

//     // searchYoutube() {
//     //     YTSearch({key: API_KEY, term: this.state.term}, (data) => {
//     //             this.setState({searchResults: data[0]});
//     //             // console.log(data);
//     //             // console.log(searchResultsdata);
//     //         }
//     // )}

//     onInputChange(term) {
//         this.setState({term});
//         this.props.onSearchTermChange(term);
//     }

//     render() {
//         // console.log(this.state.term);
//         // this.searchYoutube();
//         // console.log(this.state.searchResults);

//         return (
//             // <input onChange={this.onInputChange(event)} />

//             // short way of writing this
//             // <input onChange={(event) => {console.log(event.target.value);}} />

//             // the cleanest
//             // <input onChange={event => console.log(event.target.value)} />
//             <div className="search-bar">
//                 <input
//                     value = {this.state.term}
//                     onChange={event => {this.onInputChange(event.target.value)}}
//                 />

//             </div>
//         );
//     }

//         // this is nonviable, we must use ES6 fat arrow functions for handling events
//         // somethign is wrong here, it doesn't pass correctly the this to reach state
//     // onInputChange(event) {
//     //     this.setState({term: event.target.value});
//     //     console.log(this.state.term);

//     // }
// };

//key here, we can now call this.props.selectBook and this will call the aciton creator

// this puts out a container that is aware of the state in REDUX
// connect is passing in a state from REDUX into mapStateToProps
// the mapStateToProps takes in the state
// mapStateToProps returns books: that is accessible as this.props.books
// the books reducer should be returning an array of objects (books)
// this will instantly and continuously re-render due to CONTAINER rules on state changes

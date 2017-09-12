import React, {Component} from 'react';
// import YTSearch from 'youtube-api-search';


// const API_KEY = 'AIzaSyC0CDMCUrtnhiSf9AQddZPO9Akj-l0MNNM'



class SearchBar extends Component {

    constructor(props){
        super(props)
        this.state = {
            term: 'warhammer',
            // searchResults: [],
        }
    }

    // searchYoutube() {
    //     YTSearch({key: API_KEY, term: this.state.term}, (data) => {
    //             this.setState({searchResults: data[0]});
    //             // console.log(data);
    //             // console.log(searchResultsdata);
    //         }   
    // )}


    onInputChange(term) {
        this.setState({term});
        this.props.onSearchTermChange(term);
    }
    

    render() { 
        // console.log(this.state.term);
        // this.searchYoutube();
        // console.log(this.state.searchResults);


        return (
            // <input onChange={this.onInputChange(event)} />
            
            // short way of writing this
            // <input onChange={(event) => {console.log(event.target.value);}} />

            // the cleanest
            // <input onChange={event => console.log(event.target.value)} />
            <div className="search-bar">
                <input
                    value = {this.state.term}
                    onChange={event => {this.onInputChange(event.target.value)}}
                /> 

                
            </div>
        );
    }

        // this is nonviable, we must use ES6 fat arrow functions for handling events
        // somethign is wrong here, it doesn't pass correctly the this to reach state
    // onInputChange(event) {
    //     this.setState({term: event.target.value});
    //     console.log(this.state.term);
        
    // }
};


export default SearchBar;
// import React, {Component} from 'react';
import React, {Component} from 'react';
// import ReactDOM from 'react-dom';
import SearchBar from './search';
import VideoList from './video_list';
import VideoDetail from './video_details';
import YTSearch from 'youtube-api-search';
import _ from "lodash";

// create a new componenet


const API_KEY = 'AIzaSyC0CDMCUrtnhiSf9AQddZPO9Akj-l0MNNM'




// we always say CONST in ES6 because this will never change down the line

// const App = () => {
class VideoApp extends Component {
    


    constructor(props){
        super(props)
        this.state = {
            videos: [],
            selectedVideo: null,
        }
        this.videoSearch('youtube');

    }

    videoSearch(term){
        YTSearch({key: API_KEY, term: term}, (videos) => {
            console.log(videos);
            this.setState({
                videos: videos,
                selectedVideo: videos[0],
            });
            // this.setState({videos: videos});
            }
        );
    }

    // searchYoutube() {
    //     return (
    //         <p>{YTSearch({key: API_KEY, term: 'surfboard'}, (data) => console.log(data))}</p>
    //     );
    // }
    /* {this.searchYoutube(API_KEY)}  */
    
    render() {
        
        // this throttles to once every 400 ms
        const videoSearch = _.debounce(term => {this.videoSearch(term);}, 300);
        // const videoSearch = _.debounce(term => {this.videoSearch(term);}, 300);


        return (<div className="app-wrapper"> 
            <SearchBar onSearchTermChange={videoSearch}/>
            <VideoDetail video={this.state.selectedVideo}/>
            <VideoList 
                onVideoSelect={selectedVideo => this.setState({selectedVideo})}
                videos={this.state.videos} /> 
        </div>);
    }
    
}
 export default VideoApp;
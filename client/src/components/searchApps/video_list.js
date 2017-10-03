import React, {Component} from 'react';
import VideoListItem from './video_list_item';

class VideoList extends Component {

    // constructor(props){
    //     super(props)
        
    //     this.state = {
    //         videos: props.videos,
    //     }
    // }

    render () {
        // the MAP is key here, it turns each element in the array (video) into a property call into VideoListItem
        const videoItems = this.props.videos.map( (video) => {
            return <VideoListItem 
                onVideoSelect={this.props.onVideoSelect}
                key={video.etag} 
                video={video}/>
        });

        return (
            <ul className="col-md-4 list-group">
                {videoItems}
            </ul>
        );
    }
}

// {this.props.videos.length}

// const VideoList = (props) => {
//     var videos = props.videos;
//     return (
//         <ul className="col-md-4 list-group">
//             {videos.length}
//         </ul>  
//     );
// };

export default VideoList;
import React, { Component } from 'react';
// import gql from "graphql-tag";
import { graphql } from 'react-apollo';
import { Link } from 'react-router-dom';
// import { hashHistory } from "react-router-dom";
import LyricCreate from './LyricCreate';
import LyricList from './LyricList';

import querySong from '../../queries/querySong';

class SongDetail extends Component {
  //   constructor(props) {
  //     super(props);
  //   }

  render() {
    // console.log(this.props);

    if (this.props.data.loading) {
      return <div />;
    }
    const song = this.props.data.song;
    console.log('This is song:');
    console.log(song);
    return (
      <div>
        <h3> {song.title} </h3>

        <LyricList lyrics={song.lyrics} />
        <LyricCreate songId={song.id} />
        <Link className="btn btn-primary" to={`/lyrical`}>
          Back
        </Link>
      </div>
    );
  }
}

// export default SongDetail;

export default graphql(querySong, {
  options: props => {
    // console.log(props);
    return {
      variables: { id: props.match.params.id }
    };
  }
})(SongDetail);

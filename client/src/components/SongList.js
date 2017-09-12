import React, { Component } from "react";
// import gql from 'graphql-tag';
import { graphql, compose } from "react-apollo";
import { Link } from "react-router-dom";
import fetchSongs from "../queries/fetchSongs";
import deleteSong from "../queries/deleteSong";
// import { hashHistory } from 'react-router';

// ID data required by component -- we need SongTitle
// Write query in GRAPHIQL to proactice -- {songs{title}}
// Bond query and Component
// Access Data

class SongList extends Component {
  // constructor(props) {
  //     super(props);

  //     this.state = {
  //         id: ''
  //     };
  // }

  deleteClick(id) {
    // event.preventDefault();
    // console.log(id);
    // console.log("CLICKED");
    // console.log(this.props);
    this.props.mutate({
      variables: { id: id },
      refetchQueries: [{ query: fetchSongs }]
    });

    //alternates:
    // .then(() => this.props.data.refetch());
    // .then(() => hashHistory.push("/"));   //this is bad
  }

  renderSongs() {
    return this.props.data.songs.map(song => {
      return (
        <li key={song.id} className="collection-item">
          <Link
            className="btn btn-primary"
            to={`/lyrical/songs/${song.id}`}
            id={song.id}
          >
            {song.title}
          </Link>

          <button
            onClick={() => this.deleteClick(song.id)}
            className="btn-floating btn-small red right"
          >
            <i className="material-icons">delete</i>
          </button>
        </li>
      );
    });
  }

  render() {
    // console.log(this.props);

    // initially submitted as a PROMISE, then async return from mlabs MONGO
    // the return has a bunch of songs according to the query

    if (this.props.data.loading) {
      return <div> loading ...</div>;
    }

    return (
      <div>
        <h3> SongList Component </h3>
        <ul className="collection">{this.renderSongs()}</ul>
        <Link
          className="btn-floating btn-large green left"
          to={`/lyrical/songs/new`}
        >
          <i className="material-icons">add</i>
        </Link>
      </div>
    );
  }
}

// const query = fetchSongs;

// this is like CONNECT from REDUX
// just like REDUX, the query is going to be on the THIS.PROPS
// export default graphql(query, deleteSong)(SongList);

export default compose(graphql(fetchSongs), graphql(deleteSong))(SongList);

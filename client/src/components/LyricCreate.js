import React, { Component } from "react";
// import gql from 'graphql-tag';
import { graphql } from "react-apollo";
// import { Link } from 'react-router-dom';

import addLyric from "../queries/addLyric";
// import querySong from '../queries/querySong';

class LyricCreate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: "",
      songId: this.props.songId
    };
  }

  onSubmit(event) {
    // block submission
    event.preventDefault();
    // console.log(this.state.title);
    // mutate the server
    this.props.mutate({
      variables: {
        songId: this.state.songId,
        content: this.state.content
      }
      // , refetchQueries: [{ query: querySong }]
      // , refetchQueries: [{ query: querySong, variables: this.state.songId }] //ES6 options here, also variables:
    });
    // .then(() => );
    // .then(() => hashHistory.push("/"));
    this.setState({ content: "" });
  }

  render() {
    // console.log(this.props);
    // console.log(this.state);
    return (
      <div>
        <form onSubmit={this.onSubmit.bind(this)}>
          <label>Add a Lyric:</label>
          <input
            onChange={event => {
              this.setState({ content: event.target.value });
            }}
            value={this.state.content}
          />
        </form>
      </div>
    );
  }
}

//need to define a mutation here

//need special export to handle mutation
// export default LyricCreate;

// need to pass something in from the form submit
// but how ...
// const mutation = gql`
//     mutation AddSong($title: String){
//         addSong(title: $title){
//             title
//         }
//     }
// `;

// this is like CONNECT from REDUX
// just like REDUX, the query is going to be on the THIS.PROPS
export default graphql(addLyric)(LyricCreate);

// export default compose(
//   graphql(addLyric),
//   graphql(querySong, {options: (props) => {return {variables: {id: props.songId}}}})
// )(LyricCreate);

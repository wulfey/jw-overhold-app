import React, { Component } from "react";
// import gql from 'graphql-tag';
import { graphql } from "react-apollo";
// import { Link } from 'react-router';
import likeLyric from "../queries/thumbsUp";

class LyricList extends Component {
  // constructor(props) {
  //     super(props);

  //     // this.state = {
  //     //     content: '',
  //     //     songId: this.props.songId
  //     // };

  // }

  onLike(id, likes) {
    this.props.mutate({
      variables: { id },
      optimisticReponse: {
        __typename: "Mutation",
        likeLyric: {
          id: id,
          __typename: "LyricType",
          likes: likes + 1
        }
      }
    });
  }

  render() {
    return (
      <ul className="collection">
        {this.props.lyrics.map(({ id, content, likes }) => {
          return (
            <li key={id} className="collection-item">
              {content}

              <div className="vote-box">
                <i
                  className="material-icons"
                  onClick={() => this.onLike(id, likes)}
                >
                  thumb_up
                </i>

                {likes}
              </div>
            </li>
          );
        })}
      </ul>
    );
  }
}

export default graphql(likeLyric)(LyricList);

import React from "react";
import SongList from "./SongList";
import { Link } from "react-router-dom";

export default ({ children }) => {
  return (
    <div className="container">
      <h1>Lyrical</h1>

      <a href="/graphql">Graphql Interface</a>
      {children}
      <SongList />
    </div>
  );
};

import React, { Component } from "react";

import { Link } from "react-router-dom";

class LinkList extends Component {
  render() {
    return (
      <div>
        <Link className="btn btn-primary" to="/">
          Home Page
        </Link>
        <Link className="btn btn-success" to="/posts">
          Posts App
        </Link>
        <Link className="btn btn-success" to="/books">
          Books App
        </Link>
        <Link className="btn btn-success" to="/weather">
          Weather App
        </Link>
        <Link className="btn btn-success" to="/tictac">
          TicTac App
        </Link>
        <Link className="btn btn-success" to="/todo">
          Todo App
        </Link>
        <Link className="btn btn-success" to="/video">
          Video Search App
        </Link>
        <Link className="btn btn-danger" to="/lyrical">
          Lyrical App
        </Link>
      </div>
    );
  }
}

export default LinkList;

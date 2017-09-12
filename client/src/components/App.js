import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Header from "./Header";
import Landing from "./landing";
import Dashboard from "./dashboard";
import LinkList from "./link_list";
// import fetchUserV1 from "../actions/index";
import { connect } from "react-redux";
import ApolloClient, { createNetworkInterface } from "apollo-client";
import { ApolloProvider } from "react-apollo";
import * as actions from "../actions/index";
import PostsIndex from "./posts_index";
import PostsNew from "./posts_new";
import PostShow from "./post_show";
// import HomePage from "./homePage";
import BookIndex from "./book_index";
import WeatherIndex from "./weather_index";
import TicTac from "./tictac";
import Todo from "./todo_index";
import VideoApp from "./video_index";
import LyricalApp from "./LyricalApp";
import SongCreate from "./SongCreate";
import SongDetail from "./SongDetail";
import SongList from "./SongList";

const SurveyNew = () => <h2>Survey New</h2>;

const networkInterface = createNetworkInterface({
  uri: "/graphql",
  opts: {
    credentials: "same-origin"
  }
});

const client = new ApolloClient({
  networkInterface,
  dataIdFromObject: o => o.id
});

class App extends Component {
  // constructor(props) {
  //   super(props);
  // }

  componentDidMount() {
    this.props.fetchUserV2();
  }

  render() {
    return (
      <div className="container">
        <ApolloProvider client={client}>
          <BrowserRouter>
            <div>
              <Header />
              <LinkList />
              <Switch>
                <Route path="/video" component={VideoApp} />
                <Route path="/todo" component={Todo} />
                <Route path="/tictac" component={TicTac} />
                <Route path="/weather" component={WeatherIndex} />
                <Route path="/books" component={BookIndex} />
                <Route path="/posts/new" component={PostsNew} />
                <Route path={`/posts/:id`} component={PostShow} />
                <Route path="/posts" component={PostsIndex} />
                <Route path="/surveys/new" component={SurveyNew} />
                <Route path="/surveys" component={Dashboard} />
                <Route path="/lyrical/songs/new" component={SongCreate} />
                <Route path="/lyrical/songs/:id" component={SongDetail} />
                <Route path="/lyrical/songlist" component={SongList} />
                <Route path="/lyrical" component={LyricalApp} />
                <Route path="/" component={Landing} />
              </Switch>
            </div>
          </BrowserRouter>
        </ApolloProvider>
      </div>
    );
  }
}

// export default App;

export default connect(null, actions)(App);

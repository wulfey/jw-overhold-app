import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from './Header';
import Landing from './landing';
// import Dashboard from './dashboard';
import LinkList from './link_list';
// import fetchUserV1 from "../actions/index";
import { connect } from 'react-redux';
import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import * as actions from '../actions/index';
import PostsIndex from './graphQlApps/posts_index';
import PostsNew from './graphQlApps/posts_new';
import PostShow from './graphQlApps/post_show';
// import HomePage from "./homePage";
import BookIndex from './basicApps/book_index';
import WeatherIndex from './searchApps/weather_index';
import TicTac from './basicApps/tictac';
import Todo from './basicApps/todo_index';
import VideoApp from './searchApps/video_index';
import LyricalApp from './graphQlApps/LyricalApp';
import SongCreate from './graphQlApps/SongCreate';
import SongDetail from './graphQlApps/SongDetail';
import SongList from './graphQlApps/SongList';
// import BitpumpApp from './pumpCode/BitpumpApp';
// import BitStreamForm from './pumpCode/BitStreamForm';
import BitStreamNew from './pumpCode/BitStreamNew';
import HiveApp from './coinhive/HiveApp';
import SurveyNew from './SurveySubComponents/SurveyNew';
import SurveyDashboard from './SurveySubComponents/dashboard';

const networkInterface = createNetworkInterface({
  uri: '/graphql',
  opts: {
    credentials: 'same-origin'
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

  // <Route path="/surveys/new" component={SurveyNew} />
  // <Route path="/surveys" component={Dashboard} />

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
                <Route path="/lyrical/songs/new" component={SongCreate} />
                <Route path="/lyrical/songs/:id" component={SongDetail} />
                <Route path="/lyrical/songlist" component={SongList} />
                <Route path="/lyrical" component={LyricalApp} />
                <Route path="/bitpump/new" component={BitStreamNew} />
                <Route path="/hiveapp" component={HiveApp} />
                <Route path="/surveys/new" component={SurveyNew} />
                <Route path="/surveys" component={SurveyDashboard} />
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

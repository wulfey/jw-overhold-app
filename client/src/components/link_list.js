import React, { Component } from 'react';

import { Link } from 'react-router-dom';

class LinkList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selection: '',
      subApp: 'none'
    };
  }

  renderSubTab() {
    switch (this.state.selection) {
      case 'BasicApps':
        return (
          <div className="left" style={{ marginBottom: '5%' }}>
            {this.renderSubAppButton('Books App')}
            {this.renderSubAppButton('TicTac App')}
            {this.renderSubAppButton('Todo App')}
          </div>
        );
      case 'GraphQLApps':
        return (
          <div className="left" style={{ marginBottom: '5%' }}>
            {this.renderSubAppButton('Posts App')}
            {this.renderSubAppButton('Lyrical App')}
          </div>
        );
      case 'SearchApps':
        return (
          <div className="left" style={{ marginBottom: '5%' }}>
            {this.renderSubAppButton('Video Search App')}
            {this.renderSubAppButton('Weather App')}
          </div>
        );
      case 'CryptoApps':
        return (
          <div className="left" style={{ marginBottom: '5%' }}>
            {this.renderSubAppButton('Bitpump App')}
            {this.renderSubAppButton('HiveMiner App')}
          </div>
        );
      case 'MailerApps':
        return (
          <div className="left" style={{ marginBottom: '5%' }}>
            {this.renderSubAppButton('Survey App')}
          </div>
        );
      default:
        return <div />;
    }
  }

  myColor(position, subApp) {
    if (this.state.selection === position) {
      return `red`;
    } else if (this.state.subApp === position) {
      return 'purple';
    } else if (subApp) {
      return 'teal';
    }
    return `amber`;
  }

  getRoute(name) {
    switch (name) {
      case 'Books App':
        return '/books';
      case 'TicTac App':
        return '/tictac';
      case 'Todo App':
        return '/todo';
      case 'Posts App':
        return '/posts';
      case 'Lyrical App':
        return '/lyrical';
      case 'Video Search App':
        return '/video';
      case 'Weather App':
        return '/weather';
      case 'Bitpump App':
        return '/bitpump/new';
      case 'HiveMiner App':
        return '/hiveapp';
      case 'Survey App':
        return '/surveys';
      default:
        return '/';
    }
  }

  renderSubAppButton(name) {
    return (
      <Link
        className={`waves-effect waves-light ${this.myColor(
          name,
          true
        )} darken-4 btn`}
        to={this.getRoute(name)}
        onClick={() => {
          this.setState({ subApp: name });
        }}
      >
        {name}
      </Link>
    );
  }

  renderButton(name) {
    return (
      <button
        className={`waves-effect waves-light ${this.myColor(
          name,
          false
        )} darken-4 btn`}
        onClick={() => {
          this.setState({ selection: name });
          this.setState({ subApp: 'none' });
        }}
      >
        {name}
      </button>
    );
  }

  render() {
    console.log(this.state);

    return (
      // over tab
      <div style={{ marginBottom: '10%' }}>
        <div className="left">
          <Link
            className={`waves-effect waves-light ${this.myColor(
              '',
              false
            )} darken-4 btn`}
            onClick={() => {
              this.setState({ selection: '' });
              this.setState({ subApp: 'none' });
            }}
            to="/"
          >
            Home Page
          </Link>
          {this.renderButton('BasicApps')}
          {this.renderButton('SearchApps')}
          {this.renderButton('GraphQLApps')}
          {this.renderButton('CryptoApps')}
          {this.renderButton('MailerApps')}
          {this.renderSubTab()}
        </div>
      </div>
      // sub tab
    );
  }
}

export default LinkList;

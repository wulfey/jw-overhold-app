import React, { Component } from 'react';
// import CoinHiveClient from 'react-coin-hive';
import CoinHive from './CoinHiveClient';
import keys from '../../config/keys';
import MoneroImage from './monero.png';

class HiveApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      run: false,
      intervalObject: {},
      running: null,
      timeout: 3000,
      miner: null,
      lastHash: 0,
      totalHashes: 0
    };
  }

  componentWillUnmount() {
    this.state.miner.stop();
    clearInterval(this.state.intervalObject);
  }

  conditionalRenders() {
    switch (this.state.running) {
      case null:
        return <p> click to start </p>;
      case true:
        return <p> running </p>;
      case false:
        return <p> stopped </p>;
      default:
        return <p> check console to see if running</p>;
    }
    // if (this.state.running) {
    //   return <p> running </p>;
    // } else {
    //   return <p> stopped </p>;
    // }
  }

  handleStart() {
    this.setState({ running: true });
  }

  handleStop() {
    this.setState({ running: false });
  }

  handleStopButton() {
    if (this.state.miner !== null) {
      this.setState({ run: false, running: false });
      this.state.miner.stop();
      console.log('attempting to stop the miner');
    }
  }

  handleStartButton() {
    console.log('starting the miner');
    this.state.miner.start();

    this.setState({ run: true, running: true });
  }

  startAndStopButtons() {
    if (this.state.run === true) {
      return (
        <button
          className="btn waves-effect waves-light"
          onClick={() => {
            this.handleStopButton();
          }}
        >
          Stop the miner
        </button>
      );
    } else {
      return (
        <button
          className="btn waves-effect waves-light"
          onClick={() => {
            this.handleStartButton();
          }}
        >
          Start the miner
        </button>
      );
    }
  }

  cardRender() {
    return (
      <div className="col s12 m7">
        <h5>Welcome to the HiveApp component.</h5>
        <div className="card horizontal">
          <div className="card-image">
            <img alt="" src={MoneroImage} />
          </div>
          <div className="card-stacked">
            <div className="card-content">
              <div>{this.conditionalRenders()}</div>
              <p>Last Hash: {this.state.lastHash}</p>
              <p>Total Hashes: {this.state.totalHashes}</p>
            </div>
            <div className="card-action">{this.startAndStopButtons()}</div>
          </div>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div>
        <CoinHive
          siteKey={keys.COINHIVE_PUBLIC_KEY}
          onInit={miner => {
            this.setState({
              intervalObject: setInterval(() => {
                let lastHash = miner.getHashesPerSecond();
                let totalHashes = miner.getTotalHashes();
                this.setState({ lastHash, totalHashes });
              }, 2000)
            });
            this.setState({ miner });
          }}
          timeout={this.state.timeout}
          onStart={() => {
            console.log('started');
          }}
          onStop={() => {
            console.log('stopped');
          }}
          run={this.state.run}
        />
        {this.cardRender()}
      </div>
    );
  }
}

export default HiveApp;

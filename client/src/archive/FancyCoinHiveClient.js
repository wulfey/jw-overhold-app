import React, { Component } from 'react';
import loadScript from 'load-script';

class FancyCoinHiveClient extends Component {
  constructor(props) {
    super(props);
    this.miner = null;
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

    /* eslint-enable */
  }

  async renderFancyGraph() {
    await new Promise(resolve => {
      loadScript('https://coinhive.com/lib/coinhive.min.js', () => {
        var minerStyle = {
          width: '256',
          height: '310',
          dataKey: process.env.REACT_APP_COINHIVE_PUBLIC_KEY,
          dataAutostart: 'false',
          dataWhitelabel: 'false',
          dataBackground: '#000000',
          dataText: '#eeeeee',
          dataAction: '#00ff00',
          dataGraph: '#555555',
          dataStart: 'Start Now!'
        };

        return <div className="coinhiveMiner" style={minerStyle} />;
      });
    });
  }

  async render() {
    // console.log(CoinHive);

    await new Promise(resolve => {
      loadScript('https://coinhive.com/lib/coinhive.min.js', () => {
        var minerStyle = {
          width: '256',
          height: '310',
          dataKey: process.env.REACT_APP_COINHIVE_PUBLIC_KEY,
          dataAutostart: 'false',
          dataWhitelabel: 'false',
          dataBackground: '#000000',
          dataText: '#eeeeee',
          dataAction: '#00ff00',
          dataGraph: '#555555',
          dataStart: 'Start Now!'
        };

        return <div className="coinhiveMiner" style={minerStyle} />;
      });
    });
  }
}

export default FancyCoinHiveClient;

// let newMiner = await new Promise(resolve => {
//   loadScript('https://coinhive.com/lib/coinhive.min.js', () => {
//     if (this.props.userName) {
//       return resolve(
//         CoinHive.User(this.props.siteKey, this.props.userName)
//       );
//     }
//     // console.log('should be public key: ' + this.props.siteKey);
//     console.log(process.env);
//     return resolve(CoinHive.Anonymous(this.props.siteKey));

//   });
// });

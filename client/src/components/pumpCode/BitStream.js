import React, { Component } from 'react';
// import intervalQueryRunner from "./pumpCode/intervalQueries";
import _ from 'lodash';
// import low from "lowdb";
// import FileSync from "lowdb/adapters/FileSync";
// const adapter = new FileSync(`./pumpCode/data/db${_.now()}.json`);
import { queryBittrex } from '../../actions/index';
import { connect } from 'react-redux';
// import bittrex from 'node-bittrex-api';
// import request from 'request-promise';

import BitpumpApp from './BitpumpApp';

// const DEFAULT_URI = 'https://bittrex.com/api/v1.1/public/getmarketsummaries';

// const defaultReqOptions = {
//   method: 'GET',
//   uri: DEFAULT_URI,
//   headers: {
//     'user-agent': 'node.js',
//     'Access-Control-Allow-Headers':
//       'Origin, X-Requested-With, Content-Type, Accept'
//   },
//   json: true
// };

const defaultConfigOptions = {
  percentDif: 0.3,
  timeInterval: 10000,
  iterations: 100
};

class BitStream extends Component {
  constructor(props) {
    super(props);
    this.state = {
      outputArray: ['Bitpump initiated,results coming soon.'],
      db: [],
      run: true,
      intervalObject: {}
    };
  }

  intervalQueryRunner(configOptions = defaultConfigOptions) {
    //Set VARIABLES
    // const db = low(adapter);
    // db.defaults({ markets: [] }).write();

    var percentDif = configOptions.percentDif;
    var timeInterval = configOptions.timeInterval;
    var iterations = configOptions.iterations;

    // ********************  INITIALIZE PREVIOUS BLOCK ******************** //
    var previousHash = {};
    var previousResultArray = [];
    this.props.queryBittrex().then(() => {
      // results array is very large, 259 entries, each result has many subfields

      previousResultArray = this.props.queryResults;
      // this loads the previous hash with ~ {BTC-ETH: 0.4, ...}

      let tempDB = [];
      previousResultArray.forEach(result => {
        previousHash[result.MarketName] = result.Last;
        // let tempName = result.MarketName;

        tempDB.push({
          name: result.MarketName,
          lastArray: [result.Last],
          pumps: 0
        });
      });
      this.setState({ db: tempDB });
      // console.log(previousResultArray[0]);
      // console.log(previousHash[previousResultArray[0].MarketName]);
    });
    // ******************************************************* //

    //this is the next thing returned by the interval caller
    var nextResultArray = [];
    var nextHash = {};

    //helper variables to store values for the comparisons
    var count = 0;
    var dif = 0;
    var numbersToNamesHash = {};
    var differenceArray = [];

    this.setState({
      intervalObject: setInterval(
        async () => {
          try {
            this.props
              .queryBittrex()
              .then((nextResultArray = this.props.queryResults));

            // reset the storage arrays
            numbersToNamesHash = {};
            differenceArray = [];

            //load up the difference arrays and hashes

            // console.log(nextResultArray[0]);

            //load up the nextHash array of names to numbers to help comparison
            nextResultArray.forEach(result => {
              nextHash[result.MarketName] = result.Last;
            });
            // console.log(`THis many keys: ${Object.keys(nextHash).length}`);

            //for each key in the nextHash, check its different with previous hash
            Object.keys(nextHash).forEach(market => {
              let temp =
                (nextHash[market] - previousHash[market]) /
                previousHash[market];
              // console.log(temp);
              dif = temp * 100;

              // if the delta is non0 and > config, then put it in differenceArray

              if (dif !== 0 && dif > percentDif) {
                // this could COLLIDE
                // numbersToNamesHash stores data about a market retrievable by dif
                numbersToNamesHash[dif] = {
                  MarketName: market,
                  prev: previousHash[market],
                  next: nextHash[market]
                };
                // differenceArray can later be sorted and operated on, use the dif to access other data in the hash above

                var shallowCloneOfStateDB = _.clone(this.state.db);
                let entry = _.find(shallowCloneOfStateDB, { name: market });

                // console.log('this is entry');
                // console.log(entry);
                console.log('this is state');
                console.log(this.state);

                //   let entry = this.state.db
                //     .get("markets")
                //     .find({ name: market })
                //     .value();

                entry.lastArray.push(nextHash[market]);
                entry.pumps += 1;
                let pumps = entry.pumps;

                //   _.find(shallowCloneOfStateDB, { name: market }).lastArray.push(
                //     nextHash[market]
                //   );
                //   _.find(shallowCloneOfStateDB, { name: market }).pumps += 1;

                this.setState({ db: shallowCloneOfStateDB });

                // console.log("%%%%%%%%%%%%%");
                // console.log(lastArray);
                // console.log("%%%%%%%%%%%%%");

                //   db
                //     .get("markets")
                //     .find({ name: market })
                //     .assign({
                //       lastArray: lastArray,
                //       pumps: pumps
                //     })
                //     .write();

                differenceArray.push([dif, pumps]);
              }
            });

            // check for mismatch in number of results returned from API calls
            if (previousResultArray.length !== nextResultArray.length) {
              console.log(
                'WARNING: different numbers of results returned. Chart missing.'
              );
            }

            //sort differenceArray in ascending order
            differenceArray.sort((a, b) => {
              return b[0] - a[0];
            });

            //iterate through the difference array and log out names and percentages
            let outputArray = [];
            differenceArray.forEach((elem, i, array) => {
              var tick = numbersToNamesHash[elem[0]];

              let outputText = `${tick.MarketName} ${elem[0] > 0
                ? 'increased'
                : 'decreased'} ${elem[0].toFixed(
                5
              )}% from ${tick.prev} to ${tick.next} ${elem[1] > 1
                ? '!! ' + elem[1] + ' pumps !! '
                : ''}`;
              outputArray.push(outputText);
              // console.log(outputText);
            });
            this.setState({
              outputArray: [outputArray, ...this.state.outputArray]
            });
            // console.log('---------------');

            //make the new result into the old one for the next loop
            previousResultArray = nextResultArray;
            previousHash = {};
            // previousHash = new Object();
            Object.keys(nextHash).forEach(MarketName => {
              previousHash[MarketName] = nextHash[MarketName];
            });
          } catch (err) {
            console.log('INTERVAL request failed : ' + err);
          }

          // Iteration limits
          count++;
          if (iterations > 0) {
            if (count > iterations) {
              console.log(`exiting after ${count} iterations`);
              clearInterval(this.state.intervalObject);
            }
          }
          if (this.state.run === false) {
            console.log(`exiting after due to run being off`);
            clearInterval(this.state.intervalObject);
          }
        },
        // interval of requests in milliseconds, see config
        timeInterval
      )
    });
  }

  componentDidMount() {
    // let nextOutput = this.intervalQueryRunner(this.props.configOptions);
    // this.setState({ outputArray: [nextOutput, ...this.state.outputArray] });
    // this.setState({ run: true });
    this.props
      .queryBittrex()
      .then(this.intervalQueryRunner(this.props.configOptions));
  }

  componentWillUnmount() {
    this.setState({ run: false });
    clearInterval(this.state.intervalObject);
  }

  renderPump() {
    // let ary = this.state.outputArray[0];

    return <p>{this.state.outputArray[0]}</p>;

    // <ReactPivot
    //   rows={rows}
    //   dimensions={dimensions}
    //   reduce={reduce}
    //   calculations={calculations}
    //   nPaginateRows={25}
    // />;
  }

  render() {
    // let hiPump = this.state.outputArray[0];
    // console.log(this.state);
    if (this.state.db.length === 0) {
      return this.renderPump();
    } else {
      return (
        <div>
          {this.renderPump()}
          <BitpumpApp markets={this.state.db} />
        </div>
      );
    }
  }
}

function mapStateToProps({ auth, queryResults }) {
  return { auth, queryResults };
}

export default connect(mapStateToProps, { queryBittrex })(BitStream);

// async queryBittrexLocal(reqOptions = defaultReqOptions, URI = DEFAULT_URI) {
//   // allows submission of other URIs to overload defaults
//   const proxyurl = 'https://cors-anywhere.herokuapp.com/';
//   reqOptions.uri = proxyurl + URI;

//   try {
//     console.log('trying to get JSONResults from request using bittrex API');
//     this.props.queryBittrex();
//     // let JSONResults = await request(reqOptions);

//     // let JSONResults = await bittrex.getmarketsummaries(function(data, err) {
//     //   if (err) {
//     //     return console.error(err);
//     //   }
//     //   return data.result;
//     // });

//     // console.log(this.props);
//     // const queryResults = await this.props.queryBittrex();
//     // console.log(queryResults);

//     // return queryResults;
//   } catch (err) {
//     console.log('queryBittrex API call failed : ' + err);
//   }
// }

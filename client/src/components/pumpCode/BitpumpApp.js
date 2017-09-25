import React, { Component } from 'react';
import { connect } from 'react-redux';
import BitMarket from './BitMarket';
// import * as actions from '../../actions/index';
// import axios from 'axios';

class BitpumpApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.auth
    };
  }

  // async componentDidMount() {
  //   // console.log("component WILL:");
  //   // console.log(this.state);
  //   // console.log(this.props);
  //   const res = await axios.get("/api/current_user");
  //   this.setState({ user: res }).then(console.log(`set state`));
  // }

  // componentDidMount() {
  //   console.log("component DID:");
  //   console.log(this.state);
  //   console.log(this.props);
  //   // this.setState({ user: this.props.auth });
  // }

  renderContent() {
    switch (this.state.user) {
      case null:
        return <p>Loading. Please navigate to another app panel.</p>;
      case this.props.markets === undefined:
        return <p>No markets passed. Please wait for markets to load.</p>;
      default: {
        // console.log(this.props.markets);
        let pumpArray = [];
        let justPumps = [];
        this.props.markets.map(market => {
          if (market.pumps > 0) {
            pumpArray.push([market.pumps, market]);
            justPumps.push(market.pumps);
          }

          return 0;
        });
        if (pumpArray.length < 1) {
          return <div />;
        }

        function Comparator(a, b) {
          if (a[0] > b[0]) return -1;
          if (a[0] < b[0]) return 1;
          return 0;
        }

        pumpArray.sort(Comparator);
        // console.log('--- this is pump array::::');
        // console.log(pumpArray);

        // console.log(pumpArray);
        // let min = pumpArray[Math.floor(pumpArray.length / 2)];

        function getSum(total, num) {
          return total + num;
        }

        let avg = Math.floor(justPumps.reduce(getSum) / justPumps.length);
        // console.log(min);
        // console.log(avg);

        return (
          <ul className="collection">
            {pumpArray.map(([pump, market]) => {
              if (market.pumps > avg) {
                return (
                  <li key={market.name} className="collection-item">
                    <BitMarket market={market} />
                  </li>
                );
              }
              return null;
            })}
          </ul>
        );
      }
    }
  }

  render() {
    return (
      <div>
        <p> </p>
        {this.renderContent()}
      </div>
    );
  }
}

// full ES6
function mapStateToProps({ auth }) {
  return { auth };
}
// connect with mapStateToProps effecitvley turns this onto a captive variable
// it will be STATE without declaring it, auto update
// don't need second argument here ... just getting the auth off the store
export default connect(mapStateToProps)(BitpumpApp);

// if (!this.props.auth) {
//   return (
//     <div>
//       <p>Loading User</p>
//     </div>
//   );
// }

// {
//   this.props.auth.markets.map(market => {
//     return (
//       <div>
//         <BitMarket market={market} />
//       </div>
//     );
//   });
// }

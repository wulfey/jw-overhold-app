import React, { Component } from 'react';
import Chart from '../chart';

class BitMarket extends Component {
  renderMarket(market) {
    let name = market.name;
    let pumps = market.pumps;
    let lastArray = market.lastArray;

    return (
      <tr key={name}>
        <td>
          <a
            target="_blank"
            href={`https://bittrex.com/Market/Index?MarketName=${name}`}
          >
            {name}
          </a>
        </td>
        <td>
          <a
            target="_blank"
            href={`https://bittrex.com/Market/Index?MarketName=${name}`}
          >
            {pumps}
          </a>
        </td>
        <td>
          <Chart data={lastArray} color="blue" units="%" />
        </td>
      </tr>
    );
  }

  render() {
    if (this.props.market === undefined) {
      return <div>ERROR: undefined market.</div>;
    }
    // console.log(this.props.market);

    return (
      <div>
        <table className="table table-hover">
          <thead>
            <tr>
              <th> Name </th>
              <th> Pumps </th>
              <th> Prices </th>
            </tr>
          </thead>
          <tbody>{this.renderMarket(this.props.market)}</tbody>
        </table>
        <br />
      </div>
    );
  }
}

export default BitMarket;

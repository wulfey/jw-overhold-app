import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { connect } from 'react-redux';
import * as actions from '../actions';

class StripePayments extends Component {
  render() {
    return (
      <StripeCheckout
        name="JW Overhold"
        description="Buy 5 email credits for $5."
        amount={500}
        token={token => this.props.handleToken(token)}
        stripeKey={process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY}
      >
        <button className="btn">Add Credits</button>
      </StripeCheckout>
    );
  }
}

// don't need second argument here ... just getting the auth off the store
export default connect(null, actions)(StripePayments);

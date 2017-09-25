// BitStream New shows the form and the components from the top
import React from 'react';
import { Component } from 'react';

import BitStreamForm from './BitStreamForm';
import { reduxForm } from 'redux-form';
import BitStream from './BitStream';

class BitStreamNew extends Component {
  // constructor(props) {
  //   super(props);

  //   this.state = { new: true };
  // }

  // CRA advanced state initialization
  state = { showBitStream: false };

  renderContent() {
    if (this.state.showBitStream === true) {
      return (
        <BitStream onCancel={() => this.setState({ showBitStream: false })} />
      );
    }
    return (
      <BitStreamForm
        onBitStreamSubmit={() => this.setState({ showBitStream: true })}
      />
    );
  }

  render() {
    return (
      <div>
        <h3>BitStreamNew! CLass component</h3>
        {this.renderContent()}
      </div>
    );
  }
}

// a fine trick
// by putting the wrapper component with a form matching sub-component
// this will auto-clear using default redux-form behavior
// but the sub-component has   destroyOnUnmount: false to preserve
export default reduxForm({
  form: 'BitStreamForm'
})(BitStreamNew);

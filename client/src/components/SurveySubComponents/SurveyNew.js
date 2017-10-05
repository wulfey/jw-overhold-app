// Survey New shows the form and the components from the top
import React from 'react';
import { Component } from 'react';

import SurveyForm from './SurveyForm';
import { reduxForm } from 'redux-form';
import SurveyFormReview from './SurveyFormReview';

class SurveyNew extends Component {
  // constructor(props) {
  //   super(props);

  //   this.state = { new: true };
  // }

  // CRA advanced state initialization
  state = { showFormReview: false };

  renderContent() {
    if (this.state.showFormReview === true) {
      return (
        <SurveyFormReview
          onCancel={() => this.setState({ showFormReview: false })}
        />
      );
    }
    return (
      <SurveyForm
        onSurveySubmit={() => this.setState({ showFormReview: true })}
      />
    );
  }

  render() {
    return (
      <div>
        <h3>SurveyNew! CLass component</h3>
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
  form: 'surveyForm'
})(SurveyNew);

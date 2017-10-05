// Survey Form is our main redux form holder
import _ from 'lodash';
import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';


import React from 'react';
import { Component } from 'react';

import validateEmails from '../../utils/validateEmails';
import SurveyField from './SurveyField';

import FIELDS from './fields';

class SurveyForm extends Component {
  // you don't need this, it is included in redux form
  // handleSubmit(event) {
  //   console.log("events!!!!");
  // }
  // <form onSubmit={this.handleSubmit}>
  // const { handleSubmit } = props;

  renderFields() {
    return _.map(FIELDS, ({ label, name }) => {
      return (
        <Field
          key={name}
          component={SurveyField}
          label={label}
          name={name}
          type="text"
        />
      );
    });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
          Survey Form
          {this.renderFields()}
          <button type="submit" className="teal btn-flat right white-text">
            Submit
            <i className="material-icons right">done</i>
          </button>
          <Link className="red btn-flat left white-text" to="/surveys">
            Cancel
          </Link>
        </form>
      </div>
    );
  }
}

const validate = values => {
  // the values is always an object that is passed into INPUT form
  //console.log(values) -> { submissions for title:, categories:, content: }
  // redux form assums an empty errors {} is good, only stop if has something

  const errors = {};

  errors.recipients = validateEmails(values.recipients);

  _.each(FIELDS, ({ name, label }) => {
    if (!values[name]) {
      errors[name] = `You must provide: ${label}`;
    }
  });

  // if empty, then submits
  // if that isn't empty, then it is invalid
  return errors;
};

SurveyForm = reduxForm({
  // a unique name for the form
  // this does something really good ...
  // this adds a this.props.handleSubmit
  validate: validate,
  form: 'surveyForm',
  destroyOnUnmount: false
})(SurveyForm);

export default SurveyForm;

// other syntax
// export default reduxForm({ form: "surveyForm" })(SurveyForm);
// if (!values.title) {
//   errors.title = "Please enter a title!";
// } else if (values.title.length < 3) {
//   errors.title = "Title must be at least 3 chars.";
// }

// if (!values.subject) {
//   errors.categories = "Must have a Subject Line.";
// } else if (values.title.length < 3) {
//   errors.title = "Subject Line must be at least 3 chars.";
// }

// if (!values.body) {
//   errors.categories = "Must have an Email Body.";
// }
// if (!values.emails) {
//   errors.categories = "Must have at least one email.";
// }

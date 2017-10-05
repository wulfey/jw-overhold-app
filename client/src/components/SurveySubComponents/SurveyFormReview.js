// form review shows inputs before sending
import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import FIELDS from './fields';
import * as actions from '../../actions';
import { withRouter } from 'react-router-dom';
// import SurveyForm from './SurveyForm';
// import SurveyFormReview from './SurveyFormReview';
// import { Link } from 'react-router-dom';

const SurveyFormReview = ({ onCancel, formValues, submitSurvey, history }) => {
  const renderFields = _.map(FIELDS, ({ name, label }) => {
    return (
      <div key={name}>
        <label>{label}</label>
        <div>{formValues[name]}</div>
      </div>
    );
  });

  return (
    <div>
      <h5>Please confirm your entries.</h5>
      <div>{renderFields}</div>
      <button className="red btn-flat left white-text" onClick={onCancel}>
        Cancel
      </button>
      <button
        onClick={() => submitSurvey(formValues, history)}
        className="green btn-flat right white-text"
      >
        Send Survey
        <i className="material-icons right">email</i>
      </button>
    </div>
  );
};

// it must be getting state from the top redux container
// the state isn't from here, it is from the top container
// this maps that state into the PROPS of this component, SurveyFormReview
function mapStateToProps(state) {
  //this will add props to the component
  //   console.log(state);
  // this shows object with AUTH and FORM,  AUTH from way back from passport
  // FORM is from redux-form
  // specificlaly, it is from:   form: 'surveyForm' in SurveyForm.js
  // form.surveyForm,values
  // formValues: is then piped back up to props for SurveyFormReview
  return {
    formValues: state.form.surveyForm.values
  };
}

export default connect(mapStateToProps, actions)(withRouter(SurveyFormReview));

// <div>
//           <label>Survey Title</label>
//           <div>{formValues.title}</div>
//         </div>
//         <div>
//           <label>Subject Line</label>
//           <div>{formValues.subject}</div>
//         </div>
//         <div>
//           <label>Email Body</label>
//           <div>{formValues.body}</div>
//         </div>
//         <div>
//           <label>Recipient List</label>
//           <div>{formValues.emails}</div>
//         </div>

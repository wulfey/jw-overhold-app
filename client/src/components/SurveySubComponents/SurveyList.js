// Survey LIST is our main redux form display dealy
// import _ from 'lodash';
import React from 'react';
import { Component } from 'react';
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchSurveys } from '../../actions/index';
// import FIELDS from './fields';

class SurveyList extends Component {
  componentDidMount() {
    this.props.fetchSurveys();
  }

  renderSurveys() {
    return this.props.surveys.reverse().map(survey => {
      return (
        <div key={survey._id} className="card blue-grey darken-1  ">
          <div className="card-content white-text">
            <span className="card-title">{survey.title}</span>
            <p className="left">{survey.body}</p>
            <p className="right">
              {new Date(survey.dateSent).toLocaleDateString()}
            </p>
          </div>
          <div className="card-action">
            <a>Yes: {survey.yes}</a>
            <a>No: {survey.no}</a>
          </div>
        </div>
      );
    });
  }

  render() {
    console.log('In Surveylist  Render');
    console.log(this.props);
    if (this.props.surveys === []) {
      return <div>No surveys yet.</div>;
    }
    return <div>{this.renderSurveys()}</div>;
  }
}

function mapStateToProps({ auth, surveys }) {
  return { auth, surveys };
}

export default connect(mapStateToProps, { fetchSurveys })(SurveyList);

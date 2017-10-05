import React from 'react';
import { Link } from 'react-router-dom';
import SurveyList from './SurveyList';

const Dashboard = () => {
  return (
    <div style={{ textAlign: 'center' }}>
      <h3>Your Surveys</h3>
      <p> Your collected feedback will go here. </p>
      <SurveyList />
      <Link className="btn-floating btn-large red right" to={`/surveys/new`}>
        <i className="material-icons">add</i>
      </Link>
    </div>
  );
};

export default Dashboard;

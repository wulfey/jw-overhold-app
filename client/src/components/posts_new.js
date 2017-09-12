import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { Link } from "react-router-dom";

import { connect } from "react-redux";
// import {bindActionCreators} from 'redux';
import { createPost } from "../actions/index";

class PostsNew extends Component {
  renderField(field) {
    // const { meta: { touched, error} } = field;
    // destructuring -- you can pull stuff off of these long ass JS chains
    // field.meta.touched can be rewritten as just touched
    const className = `form-group ${field.meta.touched && field.meta.error
      ? "has-danger"
      : ""}`;
    return (
      <div className={className}>
        <label>{field.label}</label>
        <input className="form-control" type="text" {...field.input} />
        <div className="text-help">
          {field.meta.touched ? field.meta.error : ""}
        </div>
      </div>
    );
  }

  onSubmit(values) {
    // needs to be .bind(this) or else you will lose the context
    console.log(values);
    // we really want to be calling an action creator here

    this.props.createPost(values, () => {
      this.props.history.push("/posts");
    });
  }

  render() {
    // handleSubmit is passed into this by reduxForm

    const { handleSubmit } = this.props;
    //  pristine - not clicked
    // touched - clicked or texted
    // const { handleSubmit, pristine, reset, submitting, touched } = this.props;

    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <Field name="title" component={this.renderField} label="Title" />
        <Field
          name="categories"
          component={this.renderField}
          label="Categories"
        />
        <Field name="content" component={this.renderField} label="Content" />
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
        <Link className="btn btn-danger" to="/posts">
          Cancel
        </Link>
      </form>
    );
  }
}

function validate(values) {
  //console.log(values) -> { submissions for title:, categories:, content: }
  const errors = {};
  if (!values.title) {
    errors.title = "Enter a title!";
  } else if (values.title.length < 3) {
    errors.title = "Title must be 3 chars.";
  }

  if (!values.categories) {
    errors.categories = "Enter some categories!";
  }
  if (!values.content) {
    errors.content = "Enter some content!";
  }

  // if empty, then submits
  // if that isn't empty, then it is invalid
  return errors;
}

export default reduxForm({
  validate,
  form: "PostsNewForm" // a unique identifier for this form
})(connect(null, { createPost })(PostsNew));

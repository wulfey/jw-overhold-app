// FIELD to be used in forms as required, renders LABEL and TEXT
import React from 'react';

// import { Component } from 'react';

export default ({ input, label, meta: { error, touched } }) => {
  // console.log(this.props);
  return (
    <div>
      <label>{label}</label>
      <input {...input} />
      <div className="red-text" style={{ marginBottom: '20px' }}>
        {touched && error}
      </div>
    </div>
  );
};

// {touched ? error : ""}

// class SurveyField extends Component {
// constructor(props) {
//   super(props);
//   // this.state = {
//   //   input: this.props.input.value
//   // };
// }

// render() {
// let input = this.props.input;
// console.log(this.props);
// console.log(this.state.input.value);

// const { meta: { touched, error} } = field;
// destructuring -- you can pull stuff off of these long ass JS chains
// field.meta.touched can be rewritten as just touched
// const className = `form-group ${field.meta.touched && field.meta.error
//   ? "has-danger"
//   : ""}`;
// return (
//   <div className={className}>
//     <label>{field.label}</label>
//     <input className="form-control" type="text" {...field.input} />
//     <div className="text-help">
//       {field.meta.touched ? field.meta.error : ""}
//     </div>
//   </div>
// );
//
// }

// export default SurveyField;

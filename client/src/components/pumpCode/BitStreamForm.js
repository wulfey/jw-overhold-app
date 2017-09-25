import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import BitStream from './BitStream';

// import _ from 'lodash';
// import { Field, reduxForm } from 'redux-form';
import { reduxForm } from 'redux-form';

class BitStreamForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      percentDif: 0.5,
      timeInterval: 10000,
      iterations: 200
    };

    this.handleChangePercentDif = this.handleChangePercentDif.bind(this);
    this.handleChangeTimeInterval = this.handleChangeTimeInterval.bind(this);
    this.handleChangeIterations = this.handleChangeIterations.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  // handleChange = this.handleChange.bind(this);
  // handleSubmit = this.handleSubmit.bind(this);

  handleChangePercentDif(event) {
    this.setState({ percentDif: event.target.value });
  }
  handleChangeTimeInterval(event) {
    this.setState({ timeInterval: event.target.value });
  }
  handleChangeIterations(event) {
    let iterations = event.target.value;
    if (iterations > 200) {
      iterations = 200;
    }
    this.setState({ iterations });
  }

  handleSubmit(event) {
    // block submission
    event.preventDefault();
    // console.log(
    //   `Some state: ${this.state.timeInterval}, ${this.state.percentDif}, ${this
    //     .state.iterations}`
    // );
    this.setState({ redirect: true });
    // console.log(this.state.title);
    // mutate the server
    // this.props
    //   .mutate({
    //     variables: { title: this.state.title },
    //     refetchQueries: [{ query: fetchSongs }] //ES6 options here, also variables:
    //   })
    //   //   .then(() => history.push("/lyrical"));
    //   .then(() => this.setState({ redirect: true }));
  }

  // a render function that sets the state

  // render function calls the interval that keeps querying and setting the state

  // some kind of write out line here somewhere

  render() {
    const { redirect } = this.state;

    if (redirect) {
      let configOptions = {
        percentDif: this.state.percentDif,
        timeInterval: this.state.timeInterval,
        iterations: this.state.iterations
      };
      //TODO: I think that this should really be a display of a component
      return (
        <BitStream configOptions={configOptions} />
        // <Redirect to="/bitpump" configOptions={configOptions} />;
      );
    }

    return (
      <div>
        <h4>Config Your Bitpump Stream</h4>

        <form className="col s12" onSubmit={this.handleSubmit}>
          <div className="row">
            <div className="input col s4">
              <label>
                Minimum Difference in %:
                <input
                  type="text"
                  value={this.state.percentDif}
                  onChange={this.handleChangePercentDif}
                />
              </label>
            </div>

            <div className="input col s4">
              <label>
                Time Interval in ms:
                <input
                  type="text"
                  value={this.state.timeInterval}
                  onChange={this.handleChangeTimeInterval}
                />
              </label>
            </div>

            <div className="input col s4">
              <label>
                Iterations (max 200):
                <input
                  type="text"
                  value={this.state.iterations}
                  onChange={this.handleChangeIterations}
                />
              </label>
            </div>
          </div>
          <div className="row" />
          <div className="row">
            <div className="col s12">
              <button
                className="btn waves-effect waves-light"
                type="submit"
                name="action"
              >
                Submit
                <i className="material-icons right">send</i>
              </button>
            </div>
          </div>
        </form>

        <Link className="btn btn-primary" to={`/bitpump`}>
          Back
        </Link>
      </div>
    );
  }
}

// this needs to match up with the redux form language --- check the redux form code
// export default BitStreamForm;

export default reduxForm({
  form: 'bitStreamForm'
})(BitStreamForm);

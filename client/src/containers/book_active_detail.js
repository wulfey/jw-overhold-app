import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { selectBook } from "../actions/index";

class BookDetail extends Component {
  render() {
    if (!this.props.book) {
      return (
        <div>
          <h3>Select a book to start.</h3>
        </div>
      );
    }

    return (
      <div>
        <h3>Details for: </h3>
        <div>{this.props.book.title}</div>
        <div>{this.props.book.pages}</div>
      </div>
    );
  }
}

// export default ActiveBook;

function mapStateToProps(state) {
  //what is returned shold be object that is set equal to this.props
  // so whatever is in this object will be set equal to this.props
  return {
    book: state.activeBook
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ selectBook: selectBook }, dispatch);
}
//key here, we can now call this.props.selectBook and this will call the aciton creator

// this puts out a container that is aware of the state in REDUX
// connect is passing in a state from REDUX into mapStateToProps
// the mapStateToProps takes in the state
// mapStateToProps returns books: that is accessible as this.props.books
// the books reducer should be returning an array of objects (books)
// this will instantly and continuously re-render due to CONTAINER rules on state changes
export default connect(mapStateToProps, mapDispatchToProps)(BookDetail);

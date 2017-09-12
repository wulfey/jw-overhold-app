import React, { Component } from "react";
import { connect } from "react-redux";
import { selectBook } from "../actions/index";
import { bindActionCreators } from "redux";

class BookList extends Component {
  // map function that makes <li> out of each (book)=>{} in props.books
  renderList() {
    return this.props.books.map(book => {
      return (
        <li
          key={book.title}
          onClick={() => this.props.selectBook(book)}
          className="list-group-item"
        >
          {book.title}
        </li>
      );
    });
  }
  render() {
    return <ul className="list-group col-sm-4">{this.renderList()}</ul>;
  }
}

function mapStateToProps(state) {
  //what is returned shold be object that is set equal to this.props
  // so whatever is in this object will be set equal to this.props
  return {
    books: state.books
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
export default connect(mapStateToProps, mapDispatchToProps)(BookList);

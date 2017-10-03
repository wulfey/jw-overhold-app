import React, { Component } from 'react';
import Booklist from '../../containers/book_list';
import BookDetail from '../../containers/book_active_detail';

class BookIndex extends Component {
  render() {
    return (
      <div>
        <Booklist />
        <BookDetail />
      </div>
    );
  }
}

export default BookIndex;

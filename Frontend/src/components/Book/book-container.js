import React, { Component } from 'react';
import axios from 'axios';
import BookItem from './book-item';

class BookContainer extends Component {
  constructor() {
    super()

    this.state ={
        books:[]
    }
    this.renderBooks = this.renderBooks.bind(this)
  }

  booksAPICall() {
      axios.get('http://localhost:5000/books')
      .then(response => {
          console.log(response.data);
          this.setState({
              books:response.data
          })
      })
      .catch(error =>{
          console.log(error);
      })
  }

  renderBooks() {
    return this.state.books.map(book =>{
        return<BookItem key={book.id} book={book}/>
    })
  }

  componentDidMount() {
    this.booksAPICall()
  }

  render() {
    return (
       <div>
           {this.renderBooks()}
       </div>
    )
  }
}

export default BookContainer
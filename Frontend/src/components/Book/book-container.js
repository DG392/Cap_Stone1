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
    this.deleteBook = this.deleteBook.bind(this)
  }

  deleteBook(id){
    axios.delete(`http://localhost:5000/book/${id}`)
    .then(response => {
        this.setState({
            books: this.state.books.filter(book => {
              return book.id !== id
            })
        })
        return response.data
    })
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
        return<BookItem key={book.id} book={book} handleDeleteBook={this.deleteBook}/>
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
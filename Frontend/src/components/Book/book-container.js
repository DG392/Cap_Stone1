import React, { Component } from 'react';
import axios from 'axios';
import BookItem from './book-item';
import BookForm from './forms/book-form';

class BookContainer extends Component {
  constructor() {
    super()

    this.state ={
        books:[]
    }
    this.renderBooks = this.renderBooks.bind(this)
    this.deleteBook = this.deleteBook.bind(this)
    this.handleBookSubmission = this.handleBookSubmission.bind(this)
  }

  handleBookSubmission(book){
    this.setState({
        books: [book].concat(this.state.books)
    })
    console.log(book)
  }

  deleteBook(id){
    axios.delete(`https://dg-backend-bookstore.herokuapp.com/book/${id}`)
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
      axios.get('https://dg-backend-bookstore.herokuapp.com/books')
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

  updateBook(id) {
    axios.put(` https://dg-backend-bookstore.herokuapp.com/book/${id}`)
    .then(response => {
      console.log(response.data);
      this.setState({
        books:response.data
      })
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
          <div>
             <BookForm handleBookSubmission={this.handleBookSubmission} />
          </div>
           {this.renderBooks()}
       </div>
    )
  }
}

export default BookContainer
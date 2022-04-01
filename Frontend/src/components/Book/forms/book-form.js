import React, { Component } from 'react';
import axios from 'axios';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faBox } from '@fortawesome/free-solid-svg-icons';
import bookstoreImg from '../../../../static/assets/bookstore.jpg';

library.add(faTrash, faBox)

export default class BookForm extends Component {
    constructor(props) {
      super(props)
      console.log(props)

      this.state = {
         author:'',
         title:'',
         genre:'',
         price:'',
      }
      this.handleChange = this.handleChange.bind(this)
      this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(event){
      this.setState({
        [event.target.name]: event.target.value
      })
    }

    handleSubmit(event){
       event.preventDefault()
       axios.post(' https://dg-backend-bookstore.herokuapp.com/book',{
          method:'POST',
          credentials: 'same-origin',
          Headers: {
            'content-type':'application/json',
            'Access-Control-Allow-Origin':'*'
          },
          author: this.state.author,
          title: this.state.title,
          genre: this.state.genre,
          price: this.state.price
       })
       .then(response => {
          this.setState({
             title: '',
             author: '',
             genre: '',
             price: '',
          })
          this.props.handleBookSubmission(response.data)
       })
       .catch(error => {
          console.log(error);
       })
    }
     

    
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
         <input type="text" name="author" placeholder="author" value={this.state.author} onChange={this.handleChange}/>
         <input type="text" name="title" placeholder="title" value={this.state.title} onChange={this.handleChange}/>
         <input type="text" name="price" placeholder="price" value={this.state.price} onChange={this.handleChange}/>
         <input type="text" name="genre" placeholder="genre" value={this.state.genre} onChange={this.handleChange}/>
         <div className='submit-icon'>
            <button type="submit"><FontAwesomeIcon icon="box"/></button>
         </div>
      </form>
    )
  }
}



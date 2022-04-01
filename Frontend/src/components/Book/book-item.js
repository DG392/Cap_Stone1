import React from 'react';
import bookstoreImg from '../../../static/assets/bookstore.jpg';
import axios from 'axios';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPen } from '@fortawesome/free-solid-svg-icons';

library.add(faTrash, faPen)

function BookItem(props) {
    // console.log('Book Item', props)
  const{author, genre, id, price, title} = props.book
  

  return (
    <div className="book">
       <div>
         <p>{author}</p>
         <p>{id}</p>
       </div>

       <div>
         <p>{title}</p>
       </div>

       <div>
          <p>{genre}</p>
          <p>{price}</p>
       </div>

       <div className='edit-book'>
          <a className='delete-icon' onClick={() => props.handleDeleteBook(id)}>
            <FontAwesomeIcon icon="trash"/>
          </a>
            
       </div>

       <div className='update-book'>
          <a className='update-icon' onClick={() => props.handleUpdateBook(id)}>
            <FontAwesomeIcon icon="pen" />
          </a>
       </div>
    </div>
  )
}


export default BookItem
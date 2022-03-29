import React from 'react'

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

       <div>
          <button onClick={() => props.handleDeleteBook(id)}>Remove</button>
       </div>
    </div>
  )
}


export default BookItem
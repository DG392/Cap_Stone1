import React, { Component } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom'

export default class Navigation extends Component {
    constructor() {
        super();
    }

  render() {
    return (
      <div className='navigation-bar'>
          <div className='nav-container'>
            <div className='nav-links'>
              <div className='nav-btns'>
                <NavLink exact to="/" activeClassName='navi'>Inventory</NavLink>
              </div>
            </div> 

           <div className='nav-links'>
            <div className='nav-btns'>
             <NavLink exact to="/" activeClassName='navi'>More Books</NavLink>
            </div>
            </div>     
          </div>
      </div>
    )
  }
}

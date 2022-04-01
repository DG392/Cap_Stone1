import React, { Component } from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import axios from 'axios';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/fontawesome-svg-core';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import Home from '../components/pages/Home';
import BookForm from './Book/forms/book-form';
import Navigation from './pages/navigation';


export default class App extends Component {
  render() {
    return (
      <div className='app'>
       <Router>
         <Navigation />

         <Switch>
           <Route exact path="/" component={Home} />
         </Switch>
         <Switch>
           <Route exact path="/book-form" component={BookForm} />
         </Switch>
       </Router>
      </div>
    );
  }
}

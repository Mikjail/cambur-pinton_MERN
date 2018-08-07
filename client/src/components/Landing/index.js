import React, { Component } from 'react'
import Home from './Home';
import { BrowserRouter, Route } from 'react-router-dom';
import Breadcrumbs from './Breadcrumbs';
import Order from './Order'
import Login from '../Login';
import Register from '../Signup';
import './Landing.css';

export class Landing extends Component {



    render() {
      return (
        <BrowserRouter>
            <div className="landing">
                <Route exact path="/" component={Home} />
                <Route path="/order" component={Order}/>
                <Route path="/login" component={Login} />  
                <Route path="/signup" component={Register} />
            </div>
        </BrowserRouter>
      )
  }
  
}

export default Landing

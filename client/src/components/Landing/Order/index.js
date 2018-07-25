import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Food from './Food';
import Checkout from './Checkout'
import Breadcrumbs from './Food/Breadcrumbs';
import Login from '../../Login';
import './Order.css';
export class Order extends Component {


    render() {
      return (
        <BrowserRouter>
            <div className="second-section section">
                <Breadcrumbs />
                <Route exact path="/" component={Food} />
                <Route path="/checkout" component={Checkout} />
                <Route path="/login" component={Login} />  
            </div>
        </BrowserRouter>
      )
    }
}

export default Order;
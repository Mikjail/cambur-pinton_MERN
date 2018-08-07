import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Food from './Food';
import Breadcrumbs from '../Breadcrumbs';
import Checkout from './Checkout'
import Succcess from './Success';

import './Order.css';
export const Order = ({ match }) => {
      return (
    
            <div className="second-section section">
                        
                     <Breadcrumbs />
                    <Route exact path={match.url} component={Food} />
                    <Route path={`${match.url}/checkout`} component={Checkout} />
                    <Route path={`${match.url}/success`} component={Succcess} />  
            </div>

        
      )
}

export default Order;
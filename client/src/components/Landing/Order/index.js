import React from 'react';
import { Route } from 'react-router-dom';
import Food from './Food';
import Breadcrumbs from '../Breadcrumbs';
import Checkout from './Checkout'
import Succcess from './Success';
import Failure from './Failure';

import './Order.css';
export const Order = ({ match }) => {
      return (
    
            <div className="second-section section">
                        
                     <Breadcrumbs />
                    <Route exact path={match.url} component={Food} />
                    <Route path={`${match.url}/checkout`} component={Checkout} />
                    <Route path={`${match.url}/success`} component={Succcess} />  
                    <Route path={`${match.url}/failure`} component={Failure} />  
            </div>

        
      )
}

export default Order;
import React from 'react';
import { Route } from 'react-router-dom';
import Food from './Food';
import Breadcrumbs from '../Breadcrumbs';
import CheckoutContainer from '../../../containers/CheckoutContainer';
import Succcess from './Success';


import './Order.css';

export const Order = ({ match }) => {
      return (
    
            <div className="second-section section">
                  <Breadcrumbs />
                  <Route exact path={match.url} component={Food} />
                  <Route path={`${match.url}/checkout`} component={CheckoutContainer} />
                  <Route path={`${match.url}/success`} component={Succcess} />
            </div>

        
      )
}

export default Order;
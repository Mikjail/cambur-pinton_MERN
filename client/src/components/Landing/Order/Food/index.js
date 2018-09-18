import React, { Component } from 'react'
import {connect} from 'react-redux';
import * as actions from '../../../../actions';

import Loader from '../../../Loader';
import Summary from './Summary';
import MenuDesk  from './MenuDesk';
import MenuMobile  from './MenuMobile';

import './Food.css';


export class Food extends Component {

    componentDidMount(){
        localStorage.removeItem("order");
        localStorage.removeItem("total");
        localStorage.removeItem("mercadopago");
        this.props.fetchOrder();
    }

  
    render() {
    return (
        <div className="container food-section">
                <MenuDesk />
                <MenuMobile />
        <div className="hide-on-small-only">
                <Summary />
            </div>
        </div>
    )
  }
}

export default  connect(null, actions)(Food);

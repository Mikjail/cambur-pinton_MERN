import React, { Component } from 'react'
import {connect} from 'react-redux';
import * as actions from '../../../../actions';

import SummaryContainer from '../../../../containers/SummaryContainer';
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
                    <MenuDesk props={this.props}/>
                    <MenuMobile props={this.props}/>
            <div className="hide-on-med-and-down">
                    <SummaryContainer />
                </div>
            </div>
        )
  }
}

function mapStateToProps(props){
    return props;
}
export default  connect(mapStateToProps, actions)(Food);

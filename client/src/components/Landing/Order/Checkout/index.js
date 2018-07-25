import React, { Component } from 'react'

import AddressPanel from './AddressPanel';
import PaymentPanel from './PaymentPanel';
import {Summary} from './Summary';
import './Checkout.css';

export class Checkout extends Component {
  constructor(props){
    super(props);
    const user = JSON.parse(localStorage.getItem("user"));
    const addressAvailable = user.addresses.length > 0;
    this.state = { addressAvailable: addressAvailable, user: user, payLink:  JSON.parse(localStorage.getItem("mercadoPago")) }

  }
  componentDidMount(){
    let navBar = document.getElementsByClassName("breadcrumb");
    navBar[1].className += " active";
  }

  
  render() {
    const {user} = this.state;
    const { products, paymentLink } =this.props.location.state;

    return (
      <div className="container">
        <div className="row">
        <div className="col l6 m6 s12">
          <AddressPanel user={user} addresses={this.state.addressAvailable} changeStatus={(value)=>this.setState({addressAvailable: value})}/>
          <PaymentPanel addresses={this.state.addressAvailable} paymentLink={paymentLink} />
        </div>
        <div className="col offset-l2 l4 offset-m2 m4 s12">
          <Summary products={products} />
        </div>
        <div className="col l6 m6 s12">

        </div>

        </div>
        
      </div>
    )
  }
}

export default Checkout;

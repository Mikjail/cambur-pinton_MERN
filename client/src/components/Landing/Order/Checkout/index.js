import React, { Component } from 'react'
import requireAuth from '../../../../utils/requireAuth';
import AddressPanel from './AddressPanel';
import PaymentPanel from './PaymentPanel';
import * as actions from '../../../../actions';
import {Summary} from './Summary';
import './Checkout.css';
import { connect } from 'react-redux';

export class Checkout extends Component {
  state = {user:null, addressAvailable:false }
  constructor(props){
    super(props);
    this.props.currentUser();
    this.props.fetchOrder();
    this.props.fetchPaylink();
    const user = JSON.parse(localStorage.getItem("user"));
    if(user){
      this.state = { 
        addressAvailable: user.addresses.length > 0
      }
    }
  }
  componentDidMount(){
    let navBar = document.getElementsByClassName("breadcrumb");
    
    for (let index = 0; index < navBar.length; index++) {
        navBar[index].classList.remove("active");
        if(index <= 2){
            navBar[index].className += " active";
      }
    }
  }

  
  render() {
    const {addressAvailable} = this.state;
    console.log(this.props)
    const { order, mercadopago, auth} =this.props;
    if(auth && order){
      return (
        <div className="container">
          <div className="row">
          <div className="col l6 m6 s12">
            <AddressPanel user={auth} addresses={addressAvailable} changeStatus={(value)=>this.setState({addressAvailable: value})}/>
            <PaymentPanel addresses={addressAvailable} paymentLink={mercadopago} />
          </div>
          <div className="col offset-l2 l4 offset-m2 m4 s12">
            <Summary products={order} />
          </div>
          <div className="col l6 m6 s12">
  
          </div>
  
          </div>
          
        </div>
      )
    }
      return(
        <div className="container">
        <div className="row">
        <div className="col l6 m6 s12">
        ESTE SERIA EL LOADER
        </div>
        </div>
        </div>
      )
    
    
  }
}


function mapStateToProps({auth, order, mercadopago}) {
  return { auth, order, mercadopago };
}

export default connect(mapStateToProps, actions)(requireAuth(Checkout));

import React, { Component } from 'react'
import { connect } from 'react-redux';
import * as actions from '../../../../actions';
import requireAuth from '../../../../utils/requireAuth';
import AddressPanel from './AddressPanel';
import PaymentPanel from './PaymentPanel';
import Summary from './Summary';
import Loader from '../../../shared/Loader';
import './Checkout.css';

export class Checkout extends Component {
  state = {user:null, addressAvailable:false, addressSelected: false }
  constructor(props){
    super(props);
    this.props.currentUser();
    this.props.fetchOrder();
 
    const user = JSON.parse(localStorage.getItem("user"));
    if(user){
      this.state = { 
        addressAvailable: user.addresses.length > 0
      }
    }
  }

  
  
  componentDidMount(){
    let navBar = document.getElementsByClassName("breadcrumb");
    const { mercadopago } = this.props;
    if(mercadopago){
      this.props.fetchPaylink();
    }
    for (let index = 0; index < navBar.length; index++) {
        navBar[index].classList.remove("active");
        if(index <= 2){
            navBar[index].className += " active";
      }
    }
  }

  
  render() {
    const {addressAvailable, addressSelected} = this.state;
    const { order, mercadopago, auth, delivery} =this.props;
    
    if(auth && order){
      return (
        <div className="container">
          <div className="row">
          <div className="col l6 offset-m2 m8 s12">
            <AddressPanel 
            addresses={addressAvailable} 
            addressSelected={addressSelected} 
            availableAddressStatus={(value)=>this.setState({addressAvailable: value})}
            addressSelectedStatus={(value) =>{this.setState({addressSelected: value})}}/>
            <PaymentPanel 
            addresses={addressAvailable} 
            addressSelected={addressSelected} 
            paymentLink={mercadopago} />
          </div>
          <div className="col offset-l2 l4 offset-m2 m4 s12">
            <Summary products={order} delivery={delivery} />
          </div>
  
          </div>
          
        </div>
      )
    }
    return   <Loader />;
  }
}


function mapStateToProps({auth, order, mercadopago, delivery}) {
  return { auth, order, mercadopago, delivery };
}

export default connect(mapStateToProps, actions)(requireAuth(Checkout));

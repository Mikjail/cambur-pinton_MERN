import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import queryString from 'query-string';
import * as actions from '../../actions';
import { connect } from 'react-redux';
import axios from 'axios';

export class Proccess extends Component {
    
    componentWillMount(){
      let mercadopago = queryString.parse(this.props.location.search);
      let delivery = { _id : localStorage.getItem('delivery') };
      mercadopago.collection_status == 'approved' ? this.props.onSubmitOrder(this.props.history,{delivery, mercadopago} ) : this.props.history.push('/failure ');
      
    }
    

  
 render() {
    return (
      <div>
        
      </div>
    )
  }
}

function mapStateToProps({delivery}){
  return {delivery};

}

export default connect(mapStateToProps, actions)(Proccess);


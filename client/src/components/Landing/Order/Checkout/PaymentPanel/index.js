import React, { Component } from 'react'
import {connect} from 'react-redux';
import * as actions from '../../../../../actions';
import { withRouter } from 'react-router-dom';

import DivWithErrorHandling from '../../../../../utils/handlingError'
import mercadoPago from '../../../../../images/icon/mercadopago-logo.png';
import './PaymentPanel.css';
export class PaymentPanel extends Component {
    
    constructor(props){
        super(props);
        this.state = { payAmount: "", total: parseFloat(localStorage.getItem("total")) };
    }

    handleChange(e) {
        const target = e.target;
        const value =  target.value;
        this.setState({payAmount: value});
    }

    toggleCardBody(panelSelected){
        let panel1 = document.getElementById('cash-container');
        let panel2 = document.getElementById('pago-online');
       switch(panelSelected){
         case 'cash-container':
            panel1.style["display"]="flex";
            panel2.style["display"] ="none";
            return;
         case "pago-online":
            panel1.style["display"]="none";
            panel2.style["display"] ="flex";
            return;
        default:
            return;
        }
      }
  
    isAbleToPay(){
        const {payAmount, total} = this.state;
        if(this.props.addresses && (total <= payAmount)){
            return true;
        }
        return false
    }
    isAbleToPayOnline(){
        const {paymentLink} = this.props;
        if(this.props.addresses && paymentLink){
            return true;
        }
        return false;
    }

    renderChange(){
        const {payAmount, total} = this.state;
        const amount = (payAmount - total ).toFixed(2);
      if(this.isAbleToPay()){
          return <p> Cambio:  ${amount} </p>
      }
    }

    render() {
        const {paymentLink, history} = this.props;
        const { total} = this.state;

        return (
        <div className="card-panel">
            <div className="card-title">
            Medio de Pago
            <span className="right"> Total: ${total} </span>
            </div>
            <div>
            <div className="card-body">
                <div className="card-panel card-panel-payment">

                    <button className="card-title" onClick={()=> this.toggleCardBody('cash-container')}>
                        Efectivo
                    </button>
                    <div className="card-body" id="cash-container">
                
                    <label>Con cuanto desea pagar?</label>
                    <input type="number" name="paymentAmount" onChange={this.handleChange.bind(this)} value={this.state.payAmount} />
                    
                    {this.renderChange()}
                    
                    <button onClick={()=>this.props.onSubmitOrder(history) } className={"btn center "+ (this.isAbleToPay() ? 'primary' : 'disabled') }>
                        Pedir
                    </button>
                    
                </div>
                
                </div>
                <div className="card-panel card-panel-payment">
                    <button className="card-title" onClick={()=> this.toggleCardBody('pago-online')}>
                        Pago Online
                    </button>
                    <DivWithErrorHandling showError={this.props.messageAlert} />
                    <div className="card-body" id="pago-online">
                    <img alt="logo-mercadopago" className="mercadopago-logo" src={mercadoPago}/>
                    <a href={paymentLink}
                        className={"btn center "+ (this.isAbleToPayOnline() ? 'primary' : 'disabled') }>
                            Realizar Pago
                    </a>
                </div>
            
                </div>
            </div>
            
            </div>
        </div>
        )
    }
}

function mapStateToProps({messageAlert}){
    return {messageAlert}
}

export default connect(mapStateToProps, actions)(withRouter(PaymentPanel))

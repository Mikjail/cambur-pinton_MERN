import React, { Component } from 'react'
import {ComponentLoader } from '../../../../shared/ComponentLoader';
import { DELIVERY } from '../../../../../utils/keys';
import mercadoPago from '../../../../../images/icon/mercadopago-logo.png';
import './PaymentPanel.css';
import calculator from '../../../../../utils/calculator';

export default  class PaymentPanel extends Component {
    
    state = { payAmount: "" };

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
        const {payAmount} = this.state;
        const {addresses, addressSelected} = this.props;
        let totalAmount =this.calcTotal();

        if(addresses && addressSelected && (parseFloat(totalAmount) <= payAmount)){
            return true;
        }
        
        return false
    }
    isAbleToPayOnline(){
        const {paymentLink, addresses ,addressSelected } = this.props;

        if(addresses && paymentLink && addressSelected){
            return true;
        }
        return false;
    }

    renderChange(){
        const {payAmount} = this.state;
        let totalAmount =this.calcTotal();
        const amount = (payAmount - totalAmount).toFixed(2);
      if(this.isAbleToPay()){
          return <p> Cambio:  ${amount} </p>
      }
    }
    calcTotal(){
        const { products, delivery } = this.props;
        const amount=calculator.calculateSubtotal(products);
        if(delivery.radius){
            let subtotal = amount + DELIVERY[delivery.radius]; 
            let total = (subtotal * 0.90).toFixed(2);
            return total; 
        }
        return '$--';
      
    }
    renderAlertAddress(){
        const {addressSelected } = this.props;
        if(!addressSelected){
            return (
                <div className="primary-link">
                    Seleccione un Domicilio
                </div>
            )
        }
        
    }
    renderOnlinePayment(){
        const {componentLoader, paymentLink} = this.props;
        if(!componentLoader){
            return(
                    <a href={paymentLink}
                        className={"btn center "+ (this.isAbleToPayOnline() ? 'primary' : 'disabled') }>
                            Realizar Pago
                    </a>
            );
           
        }else{
            return <ComponentLoader />
        }
       
     
    }

    render() {
        const { history} = this.props;

        return (
        <div className="card-panel">
            <div className="card-title">
            Medio de Pago
            <span className="right"> Total: {this.calcTotal()} </span>
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
                    
                    <button onClick={()=>this.props.onSubmitOrder(history, this.props) } className={"btn center "+ (this.isAbleToPay() ? 'primary' : 'disabled') }>
                        Pedir
                    </button>
                    
                    {this.renderAlertAddress()}
                </div>
                
                </div>
                <div className="card-panel card-panel-payment">
                    <button className="card-title" onClick={()=> this.toggleCardBody('pago-online')}>
                        Pago Online
                    </button>
                    <div className="card-body" id="pago-online">
                    <img alt="logo-mercadopago" className="mercadopago-logo" src={mercadoPago}/>
                        {this.renderOnlinePayment()}
                    </div>
            
                </div>
            </div>
            
            </div>
        </div>
        )
    }
}
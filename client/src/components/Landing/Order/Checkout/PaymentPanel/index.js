import React, { Component } from 'react'
import mercadoPago from './mercadopago-logo.png';

export class PaymentPanel extends Component {
    
    constructor(props){
        super(props);
        this.state = { payAmount: 0, total: parseFloat(localStorage.getItem("total")) };
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
            return
         case "pago-online":
            panel1.style["display"]="none";
            panel2.style["display"] ="flex";
            return
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
      if(this.isAbleToPay()){
          return <p> Cambio:  {payAmount - total } </p>
      }
    }

    render() {
        const {paymentLink} = this.props;

        return (
        <div className="card-panel">
            <div className="card-title">
            Medio de Pago
            </div>
            <div>
            <div className="card-body">
                <div className="card-panel card-panel-payment">
                <button className="card-title" onClick={()=> this.toggleCardBody('cash-container')}>
                    Efectivo
                </button>
                <div className="card-body" id="cash-container">
                <label>Con cuanto desea pagar?</label>
                    <input type="number"  onChange={this.handleChange.bind(this)} value={this.state.payAmount} />
                    
                    {this.renderChange()}
                    
                    <button className={"btn center "+ (this.isAbleToPay() ? 'primary' : 'disabled') }>
                        Pedir
                    </button>

                </div>
                
                </div>
                <div className="card-panel card-panel-payment">
                <button className="card-title" onClick={()=> this.toggleCardBody('pago-online')}>
                    Pago Online
                </button>
                <div className="card-body" id="pago-online">
                <img className="mercadopago-logo" src={mercadoPago}/>
                <a
                href={paymentLink}
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

export default PaymentPanel

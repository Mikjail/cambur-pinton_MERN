import React, {Component} from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as actions from '../../../../../actions';
import './Summary.css';


export class Summary extends Component{


    constructor(props){
        super(props);
        this.state = {amount: 0, total: 0, toggle: false}
    }

    addCant(event, property) {
        property.cant = event.target.value;
        this.setState({amount: event.target.value});
    }

    createSelectItems() {
        let items = [];         
        for (let i = 0; i <= 12; i++) {             
             items.push(<option key={i} value={i}>{i}</option>);   
             //here I will be creating my options dynamically based on
             //what props are currently passed to the parent component
        }
        return items;
    }  

    deleteItemFromList(property){
        property.cant = 0;
        this.props.addProduct(this.props.order);
    }

    toggleOrderList(){
        let cardList = document.getElementsByClassName("card-reveal");
        let cardParent = document.getElementsByClassName("card");
        for (let index = 0; index < cardList.length; index++) {
                cardParent[index].style["overflow"]= "hidden";
                cardList[index].style["display"]="block";
                cardList[index].style["transform"]="translateY(-100%)";
        }
    }
    
    renderSummaryList(order){
        return order.map(product =>{
            return product.properties.map((property) =>{
                if(property.cant > 0){
                   return( 
                        <div className="summary-detail" key={property.name}>
                            <select value={property.cant} onChange={(e)=>this.addCant(e, property)}>
                                {this.createSelectItems()}
                            </select>
                            
                            <span className="product-detail">{product.name} - {property.name} </span>
                            <span className="product-price">${property.price * property.cant} 
                            <a href="#!" onClick={()=>this.deleteItemFromList(property)}>
                            <i className="tiny material-icons">remove_circle_outline</i>
                            </a>
                            </span>
                            
                       </div>
                    );
                }
              
            })
        })
    }

    proccesOrder(order, history){
        localStorage.setItem('order', JSON.stringify(order));
        localStorage.setItem('total', order.total)
        let user = JSON.parse(localStorage.getItem('user'));

        if(!user){
          history.push({pathname: '/login'});
         }else{
            let products= order.filter(product=>{
                return product.properties.find((property)=>{
                    if(property.cant > 0){
                        return product;
                    }
                })
            })

            products.forEach(product=>{
                product.properties =  product.properties.filter(property =>{
                    if(property.cant > 0){
                        return property;
                    }
                })
            })

            this.props.onCheckout(order, history)
         }
     
      }

    renderSubtotal(){
        let {order} = this.props;
        let amount =0 
        order.forEach(product =>{
            product.properties.forEach(property => {
                amount += property.cant  * property.price})
        })
        order.subtotal = amount + 100; 
        order.discount = (order.subtotal* 0.10).toFixed(2);
        order.total =(order.subtotal * 0.90).toFixed(2);
        return order.subtotal;   
    }


    render(){
       const { order, onCheckout, history } = this.props;
        if(this.renderSubtotal() > 100) {
            return (
                <div className="card-panel">
                    <div className="header-panel">
                        <h5>Tu Pedido </h5>
                   </div>
                   <hr />
                   {this.renderSummaryList(order)}
                    <hr />
                   <div className="total-details">
                        <section>
                            <span className="total-title">Delivery</span>
                            <span>$100</span>
                        </section>
                        <section>
                            <span className="total-title">Subtotal </span> 
                            <span> ${this.renderSubtotal()}</span>
                        </section>
                        <section>
                            <span className="total-title">Descuento - 10% </span> 
                            <span>${order.discount} </span>
                        </section>
                        <section>
                            <span className="total-title">Total </span> 
                            <span>${order.total}</span>
                        </section>
                    </div>
                    <div className="center">
                    <button
                        onClick={() => this.proccesOrder(order, history)} 
                        className="btn primary center">
                         Pedir
                    </button>
                    {/* <Link   to={{ pathname: '/checkout', state: {products: order} }}
                            className="btn primary center">
                        Pedir
                    </Link> */}

                    </div>
               </div>
           )
        }else{
            return(
                <div className="card-panel desactive">
                    <div className="header-panel">
                      <h5> Pedido Vacio </h5>
                    </div>
                    <div className="body-panel">
                        <i className="medium material-icons">
                        add_shopping_cart
                        </i>
                    </div>
                    <div className="bottom-panel">
                    <button onClick={()=>this.toggleOrderList()}  className="btn desactive center">
                        Pedir Ahora
                    </button>
                    </div>
                </div>
            )
        }
       
    }
}

function mapStateToProp({order}){
    return {order};
}

export default connect(mapStateToProp,actions)(withRouter(Summary));
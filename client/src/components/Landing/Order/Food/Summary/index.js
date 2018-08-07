import React, {Component} from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as actions from '../../../../../actions';
import './Summary.css';


export class Summary extends Component{


    constructor(props){
        super(props);
    }

    addCant(event, property) {
        property.cant = event.target.value;
        this.setState({amount: event.target.value});
    }

    createSelectItems() {
        let items = [];         
        for (let i = 0; i <= 12; i++) {             
             items.push(<option key={i} value={i}>{i}</option>);   
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

    proccesOrder(products, history){
        localStorage.setItem('order', JSON.stringify(products));
        let user = localStorage.getItem('user');

        if(!user){
          history.push({pathname: '/login'});
          this.props.fetchUser();
          let summary = document.getElementById('summary-mobile-view');
            summary.firstChild.classList.toggle('active');
         }else{

            let newProduct= products.filter(product=>{
                return product.properties.find((property)=>{
                    if(property.cant > 0){
                        return product;
                    }
                })
            })

            newProduct.forEach(product=>{
                product.properties =  product.properties.filter(property =>{
                    if(property.cant > 0){
                        return property;
                    }
                })
            })

            console.log(newProduct)
            this.props.onCheckout(newProduct, history)
         }
     
      }

    renderSubtotal(){
        let {products} = this.props;
        let calc = { subtotal: 0, discount: 0, total: 0};
        let amount =0 
      
        if(products){
            products.forEach(product =>{
                product.properties.forEach(property => {
                    amount += property.cant  * property.price})
            });

            calc.subtotal = amount + 100; 
            calc.discount = (calc.subtotal* 0.10).toFixed(2);
            calc.total =(calc.subtotal * 0.90).toFixed(2);
            localStorage.setItem('total', calc.total)
        }
        return  calc;   
    }


    render(){
       const { products, history } = this.props;
       const calc = this.renderSubtotal();
        if(calc.subtotal > 100) {
            return (
                <div className="summary-panel" id="summary-view">
                    <div className="card-panel card-summary">
                        <div className="header-panel">
                            <h5>Tu Pedido </h5>
                    </div>
                    <hr />
                    {this.renderSummaryList(products)}
                        <hr />
                    <div className="total-details">
                            <section>
                                <span className="total-title">Delivery</span>
                                <span>$100</span>
                            </section>
                            <section>
                                <span className="total-title">Subtotal </span> 
                                <span> ${calc.subtotal}</span>
                            </section>
                            <section className="primary-link">
                                <span className="total-title">Descuento Web - 10% </span> 
                                <span>${calc.discount} </span>
                            </section>
                            <section>
                                <span className="total-title">Total </span> 
                                <span>${calc.total}</span>
                            </section>
                        </div>
                        <div className="center">
                        <button
                            onClick={() => this.proccesOrder(products, history)} 
                            className="btn primary center">
                            Pedir
                        </button>
                        {/* <Link   to={{ pathname: 'order/checkout', state: {products: order} }}
                                className="btn primary center">
                            Pedir
                        </Link> */}

                        </div>
                    </div>
               </div>
           )
        }else{
            return(
                <div className="summary-panel" id="summary-view">
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
                        <button onClick={()=>this.toggleOrderList()}  className="btn desactive center hide-on-small-only">
                            Pedir Ahora
                        </button>
                        </div>
                    </div>
                </div>
            )
        }
       
    }
}

function mapStateToProp({products}){
    return {products};
}

export default connect(mapStateToProp,actions)(withRouter(Summary));
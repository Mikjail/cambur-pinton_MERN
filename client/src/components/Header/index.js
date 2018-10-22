import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import * as actions from '../../actions';

import shoppingCart from '../../images/icon/cart/btnCartNegro.png'
import './Header.css';

class Header extends Component{

    state= {toggleMenu: true}
    componentDidMount(){
        this.props.fetchProducts();
    }

    renderLogin(){
        const { auth } = this.props;
        
       switch(auth){
        case null:
        return;
        case false:
        return <li><a className="navBar-txt" href="/login"> LOGIN </a></li>
        default:
        return <li><a className="navBar-txt" href="/api/logout">LOGOUT </a></li>
            
        }

    }

  
    toggleCardBody(){

        let { toggleMenu} =this.state;

        let navBody = document.getElementById('navBody');
        let menuIcon = document.getElementById('menu-icon');
        let navBodyTxt = document.getElementsByClassName('navBar-txt');
        
        menuIcon.classList.toggle("change");

        if(toggleMenu){
            navBody.style["height"]="100%"
            for (let index = 0; index < navBodyTxt.length; index++) {
                navBodyTxt[index].style.display='block';   
            }
        }else{
            navBody.style["height"] ="0";
            for (let index = 0; index < navBodyTxt.length; index++) {
                navBodyTxt[index].style.display='none';  
            }
        }
        this.setState({toggleMenu: !this.state.toggleMenu});
    }
    
    toggleSummary(){
        let summary = document.getElementById('summary-mobile-view');          
        summary.firstChild.classList.toggle('active');
    }

    render() {
        return (
        <nav className="header-nav">
            <div className="nav-wrapper ">
                <a href="/" className="brand-logo"></a>

                <ul id="nav-mobile" className="right  hide-on-med-and-down">
                    <li className="order-btn"><a href="/order">PEDIR</a></li>
                    {this.renderLogin()} 
                </ul>
            
                <div className="hide-on-med-and-up show-on-medium-and-down" id="menu-icon" onClick={()=> this.toggleCardBody()}>
                    <div className="bar1"></div>
                    <div className="bar2"></div>
                    <div className="bar3"></div>
                </div>
                
                <ul id="nav-mobile" className="right hide-on-med-and-up show-on-medium-and-down" onClick={()=> this.toggleSummary()}>
                    <li className="waves-effect order-btn">
                        {this.renderShoppingCart()}
                     
                    </li>
                </ul>
            </div>
            
                {this.renderMobileMenu()}
           
        </nav>
        )
    }

    renderMobileMenu(){
        return(
        <div id="navBody" className="hide-on-med-and-up show-on-medium-and-down">
            <ul>
                <li><a href="javascript:void(0)" className="navBar-txt" onClick={()=>{this.navigateTo("/")}}>HOME</a></li>
                <li><a href="javascript:void(0)" className="navBar-txt" onClick={()=>{this.navigateTo("/order")}}>PEDIR</a></li>
                {this.renderLogin()} 
            </ul>
        </div>
        )
    }

    navigateTo(path){
        const {history} = this.props;

        this.toggleCardBody();
        history.push({pathname: path});
    }

    renderShoppingCart(){
        const { products} = this.props;
        let amount=0;
        if(products.length>0){
            products.forEach(product =>{
                product.properties.forEach(property => {
                    amount += property.cant;
                });
            });
        }
        if(amount > 0){
           
            return  ( <a href="#!">
                    <img alt="shopping-cart" src={shoppingCart} />
                    <span className="cant-added"> {amount}</span>
                    </a>) 
        }
        
    }
}

function mapStateToProps({ auth, products }){
    return { auth, products}
}

export default connect(mapStateToProps,actions)(withRouter(Header));
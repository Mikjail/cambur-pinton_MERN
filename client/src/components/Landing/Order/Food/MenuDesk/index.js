import React, { Component } from 'react'
import FoodList from '../FoodList';
import {connect} from 'react-redux';
import * as actions from '../../../../../actions';

import './MenuDesk.css';

export class MenuDesk extends Component {
        

componentDidMount(){
    let navBar = document.getElementsByClassName("breadcrumb");
    for (let index = 0; index < navBar.length; index++) {
        navBar[index].classList.remove("active");
        if(index <= 1){
            navBar[index].className += " active";
       }
    }
    this.props.fetchProducts();
}

dynamicClass(product){
       
    switch(product.class){
        case "patacon":
        case "empanadas":
        case "tequenos":
        case "arepa-maiz":
            return `foodImgPpal ${product.class}`;
        default:
            return `foodImgSecond ${product.class}`;
   }
}

renderCardList(indexStart, indexEnd){
    const { products } = this.props;
    let listMenu= [];
    for (let index = 0; index < products.length; index++) {
        if(index >= indexStart && index <= indexEnd){
            listMenu.push(
                <div className="card" key={products[index].name}>
                    <div className="card-image waves-effect waves-block waves-light">
                    <div className={`activator ${this.dynamicClass(products[index])}`}></div>
                    </div>
                    <div className="card-reveal">
                        <span className="card-title grey-text text-darken-4">{products[index].name}<i className="material-icons right">close</i></span>
                        <FoodList product={products[index]} 
                                 arrayProd={products}/>
                    </div>
                </div>)
        }
      
    }
    return listMenu;

}  

  render() {
    return (
      <div className="hide-on-med-and-down">
         <div className="row menu-detail">
          {this.renderCardList(0,2)}
        </div>
        <div className="row menu-detail">
          {this.renderCardList(3,5)}
        </div>
      </div>
    )
  }
}

function mapStateToProps({products}){
    return {products};
}

export default  connect(mapStateToProps,actions)(MenuDesk);

import React, { Component } from 'react'
import * as actions from '../../../../../actions';
import { connect } from 'react-redux';

import './FoodList.css';

class FoodList extends Component {

    addProduct(property){
        const {arrayProd } = this.props;
        if(property.cant <12){
            property.cant++;
        }
       
        this.props.addProduct(arrayProd)
    }

    renderFood(){
        const {product} = this.props;
        return product.properties.map(property =>{
            return (
                <li className="collection-item" key={property.name}>
                    <div>
                        {property.name}
                        <a href="#!" onClick={()=>this.addProduct(property)} className="secondary-content">
                            <i className="tiny material-icons">add</i>
                        </a>
                        <span className="product-price">${property.price}</span>
                    </div>
                </li>)
        })
    }

    render() {
            return(
                <ul className="collection with-header col s12 m12 l12" key={this.props.product.name}>
                    {this.renderFood()}
                </ul>
            )
    }
}

export default  connect(null,actions)(FoodList);
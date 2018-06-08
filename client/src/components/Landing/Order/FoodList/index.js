import React, { Component } from 'react'

import './FoodList.css';

class FoodList extends Component {
  
  
    renderFood(product){
        return product.properties.map(property =>{
            return (
                <li className="collection-item" key={property.name}>
                    <div>
                        {property.name}
                        <a href="#!" className="secondary-content">
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
                    {this.renderFood(this.props.product)}
                </ul>
            )
    }
}


export default FoodList;
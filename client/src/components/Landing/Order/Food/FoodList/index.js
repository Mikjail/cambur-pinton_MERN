import React from 'react'
import * as actions from '../../../../../actions';
import { connect } from 'react-redux';

import './FoodList.css';

const FoodList= (props) => {

    const addProduct = (property) => {
        const {arrayProd} = props;
        if(property.cant <12){
            property.cant++;
        }
       
        props.addProduct(arrayProd)
    }

    const renderFood = () => {
        
        const {product, arrayProd} = props ;
        return product.properties.map(property =>{
            return (
                <li className="collection-item" key={property.name}>
                    <div>
                        {property.name}
                        <a href="#!" onClick={()=>addProduct(property)} className="secondary-content">
                            <i className="tiny material-icons">add</i>
                        </a>
                        <span className="product-price">${property.price}</span>
                    </div>
                </li>)
        })
    }

        if(props){
            return(
                <ul className="collection with-header col s12 m12 l12" key={props.product.name}>
                    {renderFood()}
                </ul>
            )
        }else{
            return<div></div>
        }
     
}

export default connect(null,actions)(FoodList);
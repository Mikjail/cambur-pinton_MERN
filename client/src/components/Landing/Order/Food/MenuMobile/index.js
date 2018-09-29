import {Collapsible, CollapsibleItem} from 'react-materialize'
import React, { Component } from 'react'
import Loader from '../../../../shared/Loader';
import {connect} from 'react-redux';
import * as actions from '../../../../../actions';
import './MenuMobile.css';


export class MenuMobile extends Component {

    addProduct(property){
        
        if(property.cant <12){
            property.cant++;
        }
        
        this.props.addProduct(this.props.products)
    }

    substractProduct(property){
     
        if(property.cant > 0){
            property.cant--;
        }
        
        this.props.addProduct(this.props.products)
    }

    renderList(product){
        return product.properties.map(property =>{
            return (
            
                <div className="product-detail" key={property.name}>
                    <div className="product-info-panel">
                        <div className="product-head">
                            <div className="product-name">
                                <span className="product-title">{property.name}</span>
                                
                                <span className="product-price">${property.price}</span>
                            </div>
                            <div className="product-description">
                                {property.description}
                            </div>
                        </div>
                        <div className="product-body">
                        
                            <div className="product-operation">
                                <a href="javascript:void(0)" onClick={()=>this.substractProduct(property)} className="operation-btn">
                                    <i className="tiny material-icons">remove_circle_outline</i>
                                </a>
                                <span className="product-cant">{property.cant}</span>
                                <a href="#!" onClick={()=>this.addProduct(property)} className="operation-btn">
                                    <i className="tiny material-icons">add_circle_outline</i>
                                </a>
                               
                            </div>
                        
                        </div>
                    </div>
                </div>)
        })
    }

    renderCollpasePanel(products){
        return products.map( product =>{
            return(<div className="col m8 offset-m2 s12" key={product._id}>
                    <Collapsible>
                        <CollapsibleItem header={product.name} icon='arrow_drop_down'>
                    
                                <div className="product-container">
                                    
                                    {this.renderList(product)}
                                </div>
                            
                        </CollapsibleItem>
                    </Collapsible>
                </div>
           )
        })
    }
    render() {
    const { products } = this.props;
        if(products.length > 0){
            return (
                <div className="row menu-mobile">
                    {this.renderCollpasePanel(products)}
                </div>
            )
        }
        return <Loader />
    }
    
}

function mapStateToProps({products}){
    return {products};
}

export default connect(mapStateToProps,actions)(MenuMobile)

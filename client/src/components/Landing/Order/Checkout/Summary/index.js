import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { DELIVERY } from '../../../../../utils/keys';
import calculator from '../../../../../utils/calculator';
const Summary = (props) => {
    
    const renderSubtotal =({products, delivery}) => {
        let amount = 0;
        
        amount = calculator.calculateSubtotal(products);
        if(delivery.radius){
          products.subtotal = amount + DELIVERY[delivery.radius];
          products.discount = (products.subtotal * 0.10).toFixed(2);
          products.total =(products.subtotal * 0.90).toFixed(2);  
          
          localStorage.setItem('total', products.total)
          
          return products.subtotal;   
        }
        products.subtotal= '--'
        products.total= '--' 
        products.discount = '--'
        return '--'
    }
    
    
      const renderOrder= ({products}) => {
        return  products.map(product => {
          return product.properties.map(property => {
            if(property.cant > 0){
              return(
                    <tr key={property.name} className="summary-details"> 
                        <td>{product.name} -  {property.name}</td>
                        <td>{property.cant}</td>
                        <td>${property.price}</td>
                        <td>${property.price *  property.cant}</td>
                    </tr>
                    )
            }
          })
        })
      }
      
    return (
        <div id="summary-mobile-view">
          <div className="summary-checkout-panel">
          <div className="card-panel card-summary">
          <div className="card-title">
            Mi Pedido
            <Link to={{ pathname: '/order' }} className="right primary-link">
              Modificar Pedido
            </Link>
          </div>
          <div className="card-body summary">
            <table>
              <thead>
                <tr>
                    <th>Producto</th>
                    <th>Cantidad</th>
                    <th>Precio</th>
                    <th>Total</th>
                </tr>
              </thead>
              <tbody>
                  {renderOrder(props)}
                  <tr className="end-summary">
                <td colSpan="3">
                  <span className="right">
                  <strong>Delivery</strong>
                  </span>
                  </td>
                  <td>
                    ${props.delivery.radius ? DELIVERY[props.delivery.radius] : '--'}
                  </td>
                </tr>
                <tr>
                <td colSpan="3">
                  <span className="right">
                  <strong>Subtotal</strong>
                  </span>
                  </td>
                  <td>
                    ${renderSubtotal(props)}
                  </td>
                </tr>
                <tr> 
                  <td colSpan="3">
                    <span className="right primary-link">
                    <strong>10% descuento en compra web</strong>
                    </span>
                  </td>
                  <td className="primary-link">
                    ${props.products.discount}
                  </td>
                </tr>
                <tr>
                  <td colSpan="3">
                  <span className="right">
                  <strong>Total</strong>
                  </span>
                  </td>
                  <td>
                    ${props.products.total}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        </div>
      </div>
    );
}

export default Summary;

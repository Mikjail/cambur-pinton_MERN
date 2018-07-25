import React, { Component } from 'react'
import { Link } from 'react-router-dom';

export class Summary extends Component {

    renderSubtotal(products){
        let amount =0 
        products.forEach(product =>{
            product.properties.forEach(property => {
                amount += property.cant  * property.price})
        })
        products.subtotal = amount + 100; 
        products.discount = (products.subtotal * 0.10).toFixed(2);
        products.total =(products.subtotal * 0.90).toFixed(2);
        return products.subtotal;   
    }
    
    
      renderSumary(products){
        return  products.map(product => {
          return product.properties.map(property => {
            if(property.cant > 0){
              console.log("ento")
              return(
                    <tr key={property.name}> 
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
    
    
  render() {
      let {products} = this.props;
    return (
        <div className="card-panel">
        <div className="card-title">
          Mi Pedido
          <Link to={{ pathname: '/' }} className="right">
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
                {this.renderSumary(products)}
                <tr>
                <td colSpan="3">
                  <span className="right">
                  <strong>Subtotal</strong>
                  </span>
                  </td>
                  <td>
                    ${this.renderSubtotal(products)}
                  </td>
                </tr>
                <tr> 
                  <td colSpan="3">
                    <span className="right">
                    <strong>10% descuento en compra web</strong>
                    </span>
                  </td>
                  <td>
                    ${products.discount}
                  </td>
                </tr>
                <tr>
                  <td colSpan="3">
                  <span className="right">
                  <strong>Total</strong>
                  </span>
                  </td>
                  <td>
                    ${products.total}
                  </td>
                </tr>
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

export default Summary;

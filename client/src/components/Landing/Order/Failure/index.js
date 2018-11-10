import React from 'react'
import { Link } from 'react-router-dom'
import './Failure.css';
export default () => {
  return (
    <div className="container failure-section">
        <div className="schedule-img">
        </div>
        <div className="space-between hide-on-med-and-up show-on-medium-and-down">
        </div>
        <h3>
        Lo sentimos, su compra falló!
        </h3> 
        <Link to="/order"
            className="btn primary center">
            Volver
        </Link>
        <div className="space-between"></div>
    </div>
  )
}

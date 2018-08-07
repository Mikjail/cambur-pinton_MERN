import React from 'react'
import './Home.css';
import brandlogo from '../../../images/ImagotipoBlanco.png';
export default () => {
  return ( 
    <div className="section first-section">
       <div className="hide-on-small-only logo-home right">
              <img src={brandlogo} />
       </div>
    </div>
  )
}

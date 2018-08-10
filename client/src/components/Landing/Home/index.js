import React from 'react'
import {Link} from 'react-router-dom'
import './Home.css';
import brandlogo from '../../../images/ImagotipoBlanco.png';
import iconPedir from '../../../images/botonPideYa.png';
import brandLogoMobile from '../../../images/logotipoHome.png';

export default () => {
  return ( 
    <div className="section first-section">
       <div className="hide-on-small-only logo-home right">
              <img src={brandlogo} />
       </div>

       <div className="hide-on-med-and-up logo-mobile">
              <img src={brandLogoMobile} />
       </div>
       <div className="hide-on-med-and-up pedirIcon-mobile">
       <Link to="/order">
              <img src={iconPedir} />
        </Link>
       </div>
    </div>
  )
}

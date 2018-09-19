import React from 'react'
import {Link} from 'react-router-dom'
import './Home.css';
import brandlogo from '../../../images/ImagotipoBlanco.png';
import iconPedir from '../../../images/botonPideYa.png';
import brandLogoMobile from '../../../images/logotipoHome.png';
import { connect } from 'react-redux';
import * as actions from '../../../actions';

const Home = (props) => {
  props.clearProducts();
  console.log(props)

  return ( 
    <div className="section first-section">
       <div className="hide-on-med-and-down logo-home right">
              <img alt="logo-cambur-pinton" src={brandlogo} />
       </div>

       <div className="show-on-medium-and-down logo-mobile">
              <img alt="logo-cambur-pinton" src={brandLogoMobile} />
       </div>
       <div className="show-on-medium-and-down pedirIcon-mobile">
       <Link to="/order">
              <img alt="icon-cart" src={iconPedir} />
        </Link>
       </div>
    </div>
  )
}

export default connect(null,actions)(Home)
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

export default connect(null,actions)(Home)
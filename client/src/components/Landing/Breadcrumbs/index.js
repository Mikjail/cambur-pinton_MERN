import React from 'react';
import { Link } from 'react-router-dom';
import './Breadcrumbs.css';

export const Breadcrumbs = () =>{
    return ( 
     <div>   
    <nav id="location-nav"  >
        <div className="nav-wrapper">
            <div className="col s4 center-align">
                <a href="/" className="breadcrumb active">
                    <i className="small material-icons">
                    home
                    </i>
                </a >
                <div className="line-progress-bar"></div>
                <Link to="/order" className="breadcrumb active">
                    <i className="small material-icons">
                    chrome_reader_mode
                    </i>
                </Link >
                <div className="line-progress-bar"></div>
                <Link to="/order/checkout" className="breadcrumb">
                    <i className="small material-icons">
                    credit_card
                    </i>
                </Link >
                <div className="line-progress-bar"></div>
                <a  href="#!" className="breadcrumb">
                    <i className="small material-icons">
                    directions_bike
                    </i>
                </a>
            </div>
        </div>
    </nav>
    </div>

    )
}

export default Breadcrumbs;
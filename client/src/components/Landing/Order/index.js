import React, { Component } from 'react'
import './Order.css';
export class Location extends Component {
  render() {
    return (
         <nav id="location-nav">
            <div className="nav-wrapper">
            <div className="col s4 center-align">
                <a href="#!" className="breadcrumb active">
                    <i className="small material-icons">
                    chrome_reader_mode
                    </i>
                </a>
                <a href="#!" className="breadcrumb">
                    <i className="small material-icons">
                    timer
                    </i>
                </a>
                <a href="#!" className="breadcrumb">
                    <i className="small material-icons">
                    credit_card
                    </i>
                </a>
                <a href="#!" className="breadcrumb">
                    <i className="small material-icons">
                    directions_bike
                    </i>
                </a>
            </div>
            </div>
        </nav>

    )
  }
}

export default Location

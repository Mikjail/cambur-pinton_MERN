import React, { Component } from 'react'
import Home from './Home';
import Order from './Order';
import './Landing.css';

export class componentName extends Component {


  render() {
    return (
    <div className="landing">
        <div className="home-section">
              <Home />
        </div>
        <div className="location-section">
              <Order />
        </div>
    </div>
    )
  }
}

export default componentName

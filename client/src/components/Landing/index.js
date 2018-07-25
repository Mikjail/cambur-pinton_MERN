import React, { Component } from 'react'
import Home from './Home';
import Order from './Order';
import Summary from './Order/Food/Summary';
import './Landing.css';

export class Landing extends Component {


  render() {
    return (
    <div className="landing">
          <Home />
          <Order />
      </div>
    
    )
  }
}

export default Landing

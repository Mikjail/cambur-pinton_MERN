import React, { Component } from 'react';
import './Header.css';
class Header extends Component{
    render() {
        return (
            <nav>
            <div className="container">
            <div className="nav-wrapper">
              <a href="#" className="brand-logo">Logo</a>
              <ul id="nav-mobile" className="right hide-on-med-and-down">
                <li><a href="/">Promos</a></li>
                <li><a href="/">Ubicacion</a></li>
                <li><button className="btn primary">
                    Pedir
                </button></li>
              </ul>
            </div>
            </div>
          </nav>
      
        )
    }
}

export default Header;
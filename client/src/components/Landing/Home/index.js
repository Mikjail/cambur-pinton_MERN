import React from 'react'
import './Home.css';

export default () => {
  return ( 
    <div className="section first-section">
       <nav id="nav-bar">
        <div className="nav-wrapper">
          <ul>
              <li>
                <a href="#!">
                  <i className="material-icons">
                    shopping_cart
                  </i> 
                </a>
              </li>
              <li>
              <a href="#!">
                  <i className="material-icons">
                    public
                  </i> 
                </a>
              </li>
              <li>
                <a href="#!">
                  <i className="material-icons">
                    person
                  </i> 
                </a>
              </li>
          </ul>
        </div>
    </nav>)
    </div>
  )
}

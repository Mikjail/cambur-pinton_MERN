import React from 'react'
import { SocialIcon } from 'react-social-icons';
import './Footer.css'
export default () => {
  return (
      
    <footer className="page-footer">
    <div className="container">
      <div className="row">
        <div className="col l6 s12">
          <h5 className="white-text">Cambur Pinton</h5>
          <p className="grey-text text-lighten-4">
            Come rico y se feliz!
          </p>
          <p>
           <a href="tel:1147862620">+54 11 47865620</a>
          </p>
          <p>
          <a href="tel:1120045538">+54 11 20045538</a>
          </p>
        </div>
        <div className="col l4 offset-l2 s12 footer-container">
          
          <ul className="social-media">
            <li><SocialIcon url="https://www.facebook.com/camburpintonBA" /></li>
            <li><SocialIcon url="https://www.instagram.com/camburpintonba" /></li>
            <li><a target="_blank" href="https://www.tripadvisor.com.ar/Restaurant_Review-g312741-d13226143-Reviews-Cambur_Pinton-Buenos_Aires_Capital_Federal_District.html"><img src="https://www.tripadvisor.com.ar/img/cdsi/img2/branding/socialWidget/32x32_white-21690-2.png" /></a></li>
          </ul>
        </div>
      </div>
    </div>
    <div className="footer-copyright">
      <div className="container">
      © 2018 Copyright Text
      <a className="grey-text text-lighten-4 right" href="#!">Mikjail Salazar</a>
      </div>
    </div>
  </footer>
      
  )
}

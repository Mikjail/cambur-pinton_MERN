import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import requireAuth from '../../../../utils/requireAuth';
import './Success.css';
export class Successs extends Component {

  constructor(props){
      super(props);
  }

  componentDidMount(){
    let navBar = document.getElementsByClassName("breadcrumb");
    
    for (let index = 0; index < navBar.length; index++) {
        navBar[index].classList.remove("active");
        if(index <= 3){
            navBar[index].className += " active";
      }
    }
  }

  render() {
    return (
    <div className="container success-section">
        <div className="schedule-img">
        </div>
        <div className="space-between hide-on-med-and-up">
        </div>
        <h3>
            Gracias por tu compra!
        </h3> 
        <Link to="/"
            onClick={()=>{localStorage.removeItem('order')}}
            className="btn primary center">
            Volver
        </Link>
    </div>
    )
  }
}

export default requireAuth(Successs)

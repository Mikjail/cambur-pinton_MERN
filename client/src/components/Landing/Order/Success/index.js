import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import requireAuth from '../../../../utils/requireAuth';
import './Success.css';
export class Successs extends Component {

  componentDidMount(){
    if(window.defferedPrompt){
        window.defferedPrompt.prompt();
        window.defferedPrompt.userChoice.then((choiceResult)=>{
          console.log(choiceResult.outcome);
      })
  }
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
        <div className="space-between hide-on-med-and-up show-on-medium-and-down">
        </div>
        <h3>
            Gracias por tu compra!
        </h3> 
        <Link to="/"
            className="btn primary center">
            Volver
        </Link>
        <div className="space-between"></div>
    </div>
    )
  }
}

export default requireAuth(Successs)

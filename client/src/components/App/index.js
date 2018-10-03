import React, { Component } from 'react'
import { BrowserRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../actions';

import Landing from '../Landing';
import Summary from '../Landing/Order/Food/Summary';


import './App.css';



class App extends Component {

  componentDidMount() {
    this.props.fetchUser();
    this.props.fetchOrder();
    setTimeout(() => {
      if(this.defferedPrompt){
        window.defferedPrompt.prompt();
        window.defferedPrompt.userChoice.then((choiceResult)=>{
          console.log(choiceResult.outcome);
        })
      }
    },2000);
    
  }

  renderSummary(){
    if(!this.props.orders){
     
        return <Summary />
      
    }
  }

  render() {
    return (
      <BrowserRouter forceRefresh={true}>
            <div className="appView">
                  <Landing />
                  <div className="hide-on-med-and-up show-on-medium-and-down" id="summary-mobile-view">
                      {this.renderSummary()}
                  </div>
            </div>
      </BrowserRouter>
    )
  }
}

function mapStateToProps({products, order}){
  return {products, order};
}

export default connect(mapStateToProps, actions)(App);

import React, { Component } from 'react'
import { BrowserRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../actions';

import LandingContainer from '../../containers/LandingContainer';
import Summary from '../Landing/Order/Food/Summary';


import './App.css';
import SummaryContainer from '../../containers/SummaryContainer';



class App extends Component {

  componentDidMount() {
    this.props.fetchUser();
    this.props.fetchOrder();
  }

  renderSummary(){
    if(!this.props.orders){
     
        return <SummaryContainer />
      
    }
  }

  render() {
    return (
      <BrowserRouter forceRefresh={true}>
            <div className="appView">
                  <LandingContainer />
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

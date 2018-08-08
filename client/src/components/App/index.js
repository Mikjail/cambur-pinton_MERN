import React, { Component } from 'react'
import { BrowserRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../actions';


import Header  from '../Header';
import Landing from '../Landing';
import Summary from '../Landing/Order/Food/Summary';
import Footer from '../Footer';

import './App.css';


class App extends Component {

  componentDidMount() {
    this.props.fetchUser();
    this.props.fetchOrder();
  }

  renderSummary(){
    console.log(this.props);

    if(!this.props.orders){
     
        return <Summary />
      
    }
    

  }

  render() {
    return (
      <BrowserRouter forceRefresh={true}>
            <div className="appView">
                  <Header in/>
                  <Landing />
                  <div className="hide-on-med-and-up" id="summary-mobile-view">
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

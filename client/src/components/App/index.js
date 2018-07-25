import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../actions';


import Header  from '../Header';
import Landing from '../Landing';

import './App.css';

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <BrowserRouter>
            <div className="appView">
                  {/* <Header /> */}
                
                  <Landing />
                   
            </div>
      </BrowserRouter>
    )
  }
}

export default connect(null, actions)(App);

import React, { Component } from 'react'
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../actions';


import Header  from '../Header';
import Landing from '../Landing';
import './App.css';

const OrderNow = () => <h2> OrderNow</h2>

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <BrowserRouter>
            <div className="appView">
                <Header />
                <Route exact path="/" component={Landing} />
                <Route path="/orderNow" component={OrderNow} />    
            </div>
      </BrowserRouter>
    )
  }
}

export default connect(null, actions)(App);

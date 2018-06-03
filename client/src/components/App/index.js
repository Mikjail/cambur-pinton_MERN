import React, { Component } from 'react'
import { BrowserRouter, Route } from 'react-router-dom';
import Header  from '../Header';
import Landing from '../Landing';
import styles from './App.css';

const OrderNow = () => <h2> OrderNow</h2>
const MapView = () => <h2> MapView</h2>

export class App extends Component {
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

export default App;

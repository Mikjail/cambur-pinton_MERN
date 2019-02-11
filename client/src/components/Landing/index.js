import React, { Component } from 'react'
import Home from './Home';
import { BrowserRouter, Route } from 'react-router-dom';


import Loader from '../shared/Loader';
import Header from '../Header'
import Order from './Order'
import LoginContainer from '../../containers/LoginContainer';
import SignUpContainer from '../../containers/SignUpContainer';
import Footer from '../Footer';
import Failure from './Order/Failure';
import Proccess from '../Proccess';
import './Landing.css';


export default class Landing extends Component {

    renderLoader(){
        if(this.props.loader){
            return <Loader />
        }
    }

    render() {
      return (
        <BrowserRouter>
            <div className="landing">
                <Header />
                {this.renderLoader()}
                <Route exact path="/" component={Home} />
                <Route path="/order" component={Order}/>
                <Route path="/login" component={LoginContainer} />  
                <Route path="/signup" component={SignUpContainer} />
                <Route path="/failure" component={Failure} />  
                <Route path="/proccess" component={Proccess} />  
                <Footer />
            </div>
        </BrowserRouter>
      )
  }
}
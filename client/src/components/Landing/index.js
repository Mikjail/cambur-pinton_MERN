import React, { Component } from 'react'
import Home from './Home';
import { BrowserRouter, Route, withRouter } from 'react-router-dom';
import {connect} from 'react-redux';

import Loader from '../shared/Loader';
import Header from '../Header'
import Order from './Order'
import Login from '../Login';
import Register from '../Signup';
import Footer from '../Footer';
import Failure from './Order/Failure';
import Proccess from '../Proccess';
import './Landing.css';


export class Landing extends Component {

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
                <Route path="/login" component={Login} />  
                <Route path="/signup" component={Register} />
                <Route path="/failure" component={Failure} />  
                <Route path="/proccess" component={Proccess} />  
                <Footer />
            </div>
        </BrowserRouter>
      )
  }
  
}
function mapStateToProps({loader}){
    return {loader};
}


export default connect(mapStateToProps)(withRouter(Landing));

import React, { Component } from 'react'
import Home from './Home';
import { BrowserRouter, Route, withRouter } from 'react-router-dom';
import Breadcrumbs from './Breadcrumbs';
import Header from '../Header'
import Order from './Order'
import Login from '../Login';
import Register from '../Signup';
import Footer from '../Footer'
import './Landing.css';

export class Landing extends Component {

    componentDidMount(){
        console.log(this.props)
    }

    renderHeader(){
        console.log(this.props.location.pathname != '/login')
        if(this.props.location.pathname != '/login' && this.props.location.pathname != '/signup' ){
            return  <Header />
        }
        
    }

    render() {
      return (
        <BrowserRouter>
            <div className="landing">
                {this.renderHeader()}
                <Route exact path="/" component={Home} />
                <Route path="/order" component={Order}/>
                <Route path="/login" component={Login} />  
                <Route path="/signup" component={Register} />
                <Footer />
            </div>
        </BrowserRouter>
      )
  }
  
}

export default withRouter(Landing)

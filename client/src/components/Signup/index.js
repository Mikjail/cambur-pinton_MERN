import React, { Component } from 'react'
import _ from 'lodash';
import { Field } from 'redux-form';
import { Link } from 'react-router-dom';


import DivWithErrorHandling from '../../utils/handlingError';
import formField from './formField';
import LoginField from '../Login/LoginField';
import validateForm from '../../utils/validateEmails';
import './Signup.css';


export default class Signup extends Component {
    constructor(props){
        super(props);
        const user = localStorage.getItem('user');
        if(user) this.props.history.push('/')
    
    }

    componentDidMount(){
        document.getElementById("signUp-btn").disabled = true;
    }

    renderFields(){
        return _.map(formField, ({label, name, type})=>{
           
            return <Field
            key={name} 
            component={LoginField} 
            type={type}
            label={label}
            name={name}
            />
        })
    }
  

    render() {
        return (
            <div className="login-section regsiter-section"> 
                <div className="card-panel">
                    <div className="header-panel">
                            <h5>Registrese</h5>
                    </div>
                    <div className="body-panel">
                        <a href="/auth/google" className="btn center google-btn">
                            <span className="google-icon">
                            </span>
                            <span className="btn-title">
                                CONTINUAR CON GOOGLE
                            </span>
                        </a>
                            
                        <hr/>
            
                        <form onSubmit={this.props.handleSubmit(this.props.onSignup)}>
                            {this.renderFields()}
                            <button type="submit" id="signUp-btn" className="btn btn-login primary white-text">
                                Registrar Usuario
                            </button>
                            <DivWithErrorHandling showError={this.props.messageAlert} />
                            <div className="g-recaptcha" data-sitekey="6Le412YUAAAAAM5_erf_gO4uoty8oTTjW4jSmWJj" data-callback="enableButton"></div>
                        </form>
                        <div className="forgot-password">
                                Ya tiene cuenta?  <Link className="primary-link" to="/login"> Login</Link>
                        </div>
                    </div>
                </div>
            </div>
            )
  }
}
import React, { Component } from 'react'
import _ from 'lodash';
import  { reduxForm, Field } from 'redux-form';
import {connect} from 'react-redux';
import { compose } from 'redux';
import * as actions from '../../actions'
import { withRouter, Link } from 'react-router-dom';

import DivWithErrorHandling from '../../utils/handlingError';
import formField from './formField';
import LoginField from '../Login/LoginField';
import validateForm from '../../utils/validateEmails';
import './Signup.css';


export class Signup extends Component {



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
           console.log(type)
            return <Field
            key={name} 
            component={LoginField} 
            type={type}
            label={label}
            name={name}
            />
        })
    }

    enableButton(response){
        console.log(response);
        document.getElementById("signUp-btn").disabled = false;
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
                            <div className="g-recaptcha" data-sitekey="6Le412YUAAAAAM5_erf_gO4uoty8oTTjW4jSmWJj" data-callback={(response)=>{this.enableButton(response)}}></div>
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
function validate(values) {
    const errors = {};
    
    errors.email= validateForm.validateEmail(values.email);
    
    errors.confirmPass = validateForm.confirmPass(values);

    _.each(formField, ({ name })=>{
        if(!values[name]){
           errors[name]= 'Requerido';
        }
    });

 


    return errors;
}


export default compose(
    connect(null,actions),
    reduxForm({ 
    validate, 
    form: 'registerForm',
    destroyOnUnmount: false })
    )(withRouter(Signup));


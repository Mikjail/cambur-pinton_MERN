import React, { Component } from 'react'
import _ from 'lodash';
import  { reduxForm, Field } from 'redux-form';
import {connect} from 'react-redux';
import { compose } from 'redux';
import * as actions from '../../actions'
import { withRouter } from 'react-router-dom';


import DivWithErrorHandling from '../../utils/handlingError';
import formField from './formField';
import LoginField from './LoginField';
import validateForm from '../../utils/validateEmails';
import './Login.css';

export class Login extends Component {

    constructor(props){
        super(props);
        
        const user = localStorage.getItem('user');
        if(user) this.props.history.push('/');
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


    render() {
        return (
        <div className="login-section"> 
            <div className="card-panel">
                <div className="header-panel">
                    <h5>Login</h5>
                </div>
                <div className="space-between"></div>
                <div className="body-panel">
                <form onSubmit={
                    this.props.handleSubmit(({user, password}, action, {history})=>{
                    
                    this.props.onLogin(user,password, history)})}>
                    
                    {this.renderFields()}

                    <div className="forgot-password">
                        <a className="primary-link" href="">Olvido su contraseña ?</a>
                    </div>
                    <div className="space-between"></div>
                    <button type="submit" className="btn btn-login primary white-text">
                        Login
                    </button>
                    <DivWithErrorHandling showError={this.props.messageAlert} />
                </form>
            
                <hr />

                <a href="/auth/google" className="btn center google-btn">
                    <span className="google-icon">
                    </span>
                    <span className="btn-title">
                        CONTINUAR CON GOOGLE
                    </span>
                </a>
                <div className="forgot-password">
                        No tiene cuenta?  <a className="primary-link" href="/signup"> Registrese </a>
                </div>
                </div>
              
               
            </div>
        </div>
        )
    }
}

function validate(values) {
    const errors = {};
    errors.user= validateForm.validateEmail(values.user);
    
    _.each(formField, ({ name })=>{
        if(!values[name]){
           errors[name]= 'Requerido';
        }
    });
  
    return errors;
}
function mapStateToProps({messageAlert}){
        return {messageAlert};
}

export default  compose(
    connect(mapStateToProps,actions),
    reduxForm({ 
    validate, 
    form: 'loginForm',
    destroyOnUnmount: false 
    }))(withRouter(Login));

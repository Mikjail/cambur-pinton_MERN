import React, { Component } from 'react'
import _ from 'lodash';
import  { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import formField from './formField';
import LoginField from './LoginField';
import validateEmails from '../../utils/validateEmails';
import './Login.css';

export class Login extends Component {
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

    goBackHome(){
        console.log("hola mundo")
    }

    render() {
        console.log(this.props)
        return (
        <div className="login-section"> 
            <div className="card-panel">
                <div className="header-panel">
                    <h5>Login</h5>
                </div>
                <div className="body-panel">
           
                <form onSubmit={this.props.handleSubmit(this.goBackHome)}>
                    {this.renderFields()}
                  
                    <button type="submit" className="btn btn-login primary white-text">
                        Login
                    </button>

                </form>
                </div>
                <hr />
                <a href="/auth/google" className="btn center google-btn">
                    <span className="google-icon">
                    </span>
                    <span className="btn-title">
                        CONTINUAR CON GOOGLE
                    </span>
                </a>
                
            </div>
        </div>
        )
    }
}

function validate(values) {
    const errors = {};

    errors.recipients= validateEmails(values.recipients || '');
    
    _.each(formField, ({ name })=>{
        if(!values[name]){
           errors[name]= 'You must provide a value';
        }
    });
  
    return errors;
}

export default reduxForm({ 
    validate, 
    form: 'loginForm',
    destroyOnUnmount: false 
    })(Login);

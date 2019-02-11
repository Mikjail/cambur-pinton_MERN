import { connect } from 'react-redux';
import { compose } from 'redux';
import { reduxForm } from 'redux-form';
import { withRouter } from 'react-router-dom';
import _ from 'lodash';
import * as actions from '../actions';
import Login from '../components/Login'
import formField from '../components/Login/formField';
import validateForm from '../utils/validateEmails';

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

const mapStateToProps = ({messageAlert}) => ({messageAlert});

export default compose(
    connect(mapStateToProps,actions),
    reduxForm({ 
    validate, 
    form: 'loginForm',
    destroyOnUnmount: false 
    }))(withRouter(Login));

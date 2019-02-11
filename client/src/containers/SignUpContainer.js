import { connect } from 'react-redux';
import { compose } from 'redux';
import { reduxForm } from 'redux-form';
import { withRouter } from 'react-router-dom';
import _ from 'lodash';
import formField from '../components/Signup/formField';
import validateForm from '../utils/validateEmails';
import * as actions from '../actions';
import Signup from '../components/Signup';

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

const mapStateToProps = ({messageAlert}) => ({messageAlert});

const SignupContainer = compose(
    connect(mapStateToProps,actions),
    reduxForm({ 
    validate, 
    form: 'registerForm',
    destroyOnUnmount: false })
    )(withRouter(Signup));

export default SignupContainer;
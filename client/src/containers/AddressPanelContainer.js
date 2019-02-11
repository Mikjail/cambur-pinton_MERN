import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { compose } from 'redux';
import _ from 'lodash';
import * as actions from '../actions';
import formField from '../components/Landing/Order/Checkout/AddressPanel/formField';
import AddressPanel from '../components/Landing/Order/Checkout/AddressPanel';

function validate(values) {
    const errors = {};

    _.each(formField, ({ name })=>{
        if(!values[name]){
           errors[name]= 'Requerido';
        }
    });
  
    return errors;
}


const mapStateToProps = ({auth, delivery, checkedAddress}) => {
    return { auth, delivery, checkedAddress };
}

export default compose(
    connect(mapStateToProps,actions),
    reduxForm({ validate, form: 'addressForm', destroyOnUnmount: false })
    )(AddressPanel);
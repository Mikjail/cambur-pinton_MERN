import React, { Component } from 'react'
import _ from 'lodash';
import  { reduxForm, Field } from 'redux-form';
import formField from './formField';
import AddressField from './AddressField';
import './AddressPanel.css';
import {connect} from 'react-redux';
import * as actions from '../../../../../actions'

export class AddressPanel extends Component {

    constructor(props){
        super(props)
    }

    componentDidMount(){
    }
    renderFields(){
        return _.map(formField, ({label, name, type, styling})=>{
            return <Field
            key={name} 
            component={AddressField} 
            type={type}
            label={label}
            name={name}
            styling={styling}
            />
        })
    }

    onSubmit(value, history){
        const { user } = this.props;
        user.addresses.push(value)
        this.props.changeStatus(true);
        this.props.onSubmitAddress(value, history);
        
    }

    renderAddresses(){
        
        const { addresses, user } = this.props;

        if(!addresses){
            return( <form onSubmit={this.props.handleSubmit(this.onSubmit.bind(this))}>
                {this.renderFields()}
                <div className="col s12 m12 l12">
                <button type="submit" className="btn btn-login primary white-text">
                    Agregar
                </button>
                </div>
            </form>)
        }
        else{
            return user.addresses.map(address => {
                return(
                    <ul key={address.street}>
                    <li>
                        {address.telephone} - {address.street} {address.number}, {address.floor} {address.apartment}. {address.zone}  
                    </li>
                    </ul>
                );   
            }) 
        }
  }

  toggleAddressPanel(value){
    this.props.changeStatus(value);
  }

  renderAddAdressLink(){
           
    const { addresses } =  this.props;
    if(addresses){
        return (
            <a href="javascript:void(0);" onClick={()=>{this.toggleAddressPanel(false)}} className="right">
            Agregar Domicilio
                </a>
          )
      }else{
        return ( <a href="javascript:void(0);" onClick={()=>{this.toggleAddressPanel(true)}}className="right">
            cancelar
        </a>
        )
      }
  }
  
  render() {
    return (
        <div className="card-panel">
            <div className="card-title">
                    Domicilio
                    {this.renderAddAdressLink()}
            </div>
            <div className="card-body">
                {this.renderAddresses()}
            </div>
        </div>
    )
  }
  
}

function validate(values) {
    const errors = {};

    // errors.recipients= validateEmails(values.recipients || '');
    
    _.each(formField, ({ name })=>{
        if(!values[name]){
           errors[name]= 'You must provide a value';
        }
    });
  
    return errors;
}

AddressPanel = connect(null,actions)(AddressPanel);

export default reduxForm({ validate, form: 'addressForm', destroyOnUnmount: false })(AddressPanel);

import React, { Component } from 'react'
import _ from 'lodash';
import  { reduxForm, Field } from 'redux-form';
import formField from './formField';
import AddressField from './AddressField';
import './AddressPanel.css';
import {connect} from 'react-redux';
import { compose } from 'redux';
import * as actions from '../../../../../actions'

export class AddressPanel extends Component {

    constructor(props){
        super(props)
        this.state = { checkedItems: null }
    }
    componentWillMount(){
        const { auth } = this.props;
        if(auth){
            if(!this.state.checkedItems && auth.addresses.length> 0){
                this.setState({checkedItems: auth.addresses[0]._id});
                localStorage.setItem("address",auth.addresses[0]._id)
            }
        }

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

    handleCheck(e) {
        const item = e.target.value;
        this.setState({ checkedItems: item});
        localStorage.setItem("address",e.target.value)
      }
    
    renderAddresses(){
        
        const { addresses, auth } = this.props;
        console.log(this.props)
        if(!addresses){
            return( <form onSubmit={this.props.handleSubmit(this.props.onSubmitAddress)}>
                {this.renderFields()}
                <div className="col s12 m12 l12">
                <button type="submit" className="btn btn-login primary white-text">
                    Agregar
                </button>
                </div>
            </form>)
        }
        if(auth){
            if(auth.addresses.length> 0){
                return auth.addresses.map(address => {
                    return(
                        <ul key={address.street}>
                        <li>
                            <input type="radio" value={address._id} checked={this.state.checkedItems === address._id} onChange={this.handleCheck.bind(this)} />
                            <span>{address.telephone} - {address.street} {address.number}, {address.floor} {address.apartment}. {address.zone} </span>
                        </li>
                        </ul>
                    );   
                })  
            }
        }else{
            return(<div> PENSANDO</div>)
        }
        
    }
  


  renderAddAdressLink(){
           
    const { addresses, auth } =  this.props;
    
    if(addresses){
        return (
            <a href="javascript:void(0);" onClick={()=>{this.props.changeStatus(false)}} className="right primary-link">
            Agregar Domicilio
                </a>
          )
      }else{
        if(auth.addresses.length > 0){
            return ( <a href="javascript:void(0);" onClick={()=>{this.props.changeStatus(true)}}className="right">
            cancelar
        </a>)
        }
      }
  }
  
  render() {
      const{auth} = this.props;
    if(auth){
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
    }else{
        return(
            <div> loader </div>
        )
    }
  }
  
}

function validate(values) {
    const errors = {};

    // errors.recipients= validateEmails(values.recipients || '');
    
    _.each(formField, ({ name })=>{
        if(!values[name]){
           errors[name]= 'Requerido';
        }
    });
  
    return errors;
}
function mapStateToProps({auth}) {
    return { auth };
  }
  

export default compose(
    connect(mapStateToProps,actions),
    reduxForm({ validate, form: 'addressForm', destroyOnUnmount: false })
    )(AddressPanel);



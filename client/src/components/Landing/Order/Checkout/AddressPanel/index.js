import React, { Component } from 'react'
import  {  Field } from 'redux-form';
import _ from 'lodash';

import formField from './formField';
import AddressField from './AddressField';


import './AddressPanel.css';

export default class AddressPanel extends Component {

    componentWillMount(){
        this.props.fetchUser();
    }

    componentDidMount(){
        const {auth, checkedAddress } = this.props;
        let defaultAddress = auth.addresses[0];
        if(auth){
            if(!checkedAddress && auth.addresses.length> 0){
                this.props.setCheckedAddress(defaultAddress._id);
                this.props.addressSelectedStatus(true);
                let address = checkedAddress ? auth.addresses.find(address => address._id == checkedAddress): defaultAddress
                this.props.addDeliveryStatus(address.delivery);
                this.props.onCheckout(address.delivery);
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

    removeAddress(id){
        const { auth } =this.props
        if(auth.addresses.length>1 && auth.addresses[0]._id !== id){
            this.setState({checkedItems:auth.addresses[0]._id  })
        }

        this.props.removeAddress(id, this.props)
    }

    handleCheck(e) {
        const {auth, delivery} = this.props;
        const item = e.target.value;
        this.props.addressSelectedStatus(true);
        let address = auth.addresses.find(address => address._id == item);
        if(delivery.radius !== address.delivery.radius){
            this.props.onCheckout(address.delivery);
        }
        this.props.addDeliveryStatus(address.delivery);
        this.props.setCheckedAddress(item);
      }

    renderAddresses(){
        
        const { addresses, auth,checkedAddress } = this.props;
        
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
                            <div className="address-text">
                                <input type="radio" value={address._id} checked={checkedAddress === address._id} onChange={this.handleCheck.bind(this)} />
                                <span>{address.telephone} - {address.street}, {address.floor} {address.apartment}. {address.zone} </span>
                            </div>
                            <div className="remove-btn address-remove">
                                <i onClick={()=>{this.removeAddress()}} className="tiny material-icons">
                                    remove_circle_outline
                                </i>
                            </div>

                         </li>
                        </ul>
                    );   
                })  
            }
        }else{
            return(<div> Loading... </div>)
        }
        
    }
  


  renderAddAdressLink(){
           
    const { addresses, auth } =  this.props;
    
    if(addresses){
        return (
            <a href="javascript:void(0);" onClick={()=>{this.props.availableAddressStatus(false)}} className="right primary-link">
            Agregar Domicilio
                </a>
          )
      }else{
        if(auth.addresses.length > 0){
            return ( <a href="javascript:void(0);" onClick={()=>{this.props.availableAddressStatus(true)}} className="right primary-link">
            cancelar
        </a>)
        }
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
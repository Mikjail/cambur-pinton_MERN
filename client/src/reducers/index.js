import { combineReducers } from 'redux';
import { reducer as reduxForm } from 'redux-form';
import authReducer from './authReducer';
import productsReducer from './productsReducer';
import orderReducer from './orderReducer';
import delivery from './deliveryReducer';
import mercadopagoReducer from './mercadopagoReducer';
import messageAlert from './messageAlert';
import checkedAddressReducer from './checkedAddressReducer';
import componentLoader from './componentLoader';
import loader from './loader';

export default combineReducers({
    auth:authReducer,
    products: productsReducer,
    order: orderReducer,
    checkedAddress: checkedAddressReducer,
    mercadopago: mercadopagoReducer,
    messageAlert:messageAlert,
    loader: loader,
    delivery: delivery,
    componentLoader: componentLoader,
    form: reduxForm
})
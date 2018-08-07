import { combineReducers } from 'redux';
import { reducer as reduxForm } from 'redux-form';
import authReducer from './authReducer';
import productsReducer from './productsReducer';
import orderReducer from './orderReducer';
import mercadopagoReducer from './mercadopagoReducer';
import messageAlert from './messageAlert';
export default combineReducers({
    auth:authReducer,
    products: productsReducer,
    order: orderReducer,
    mercadopago: mercadopagoReducer,
    messageAlert:messageAlert,
    form: reduxForm
})
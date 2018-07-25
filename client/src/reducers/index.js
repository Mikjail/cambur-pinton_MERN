import { combineReducers } from 'redux';
import { reducer as reduxForm } from 'redux-form';
import authReducer from './authReducer';
import productsReducer from './productsReducer';
import orderReducer from './orderReducer';

export default combineReducers({
    auth:authReducer,
    products: productsReducer,
    order: orderReducer,
    form: reduxForm
})
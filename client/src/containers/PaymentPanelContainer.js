import {connect} from 'react-redux';
import {  withRouter } from 'react-router-dom';
import * as actions from '../actions';
import PaymentPanel from '../components/Landing/Order/Checkout/PaymentPanel';

const mapStateToProps = ({messageAlert, delivery, products, componentLoader}) => 
({messageAlert, delivery, products, componentLoader});

export default connect(mapStateToProps, actions)(withRouter(PaymentPanel))

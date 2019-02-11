import { connect } from  'react-redux';
import  * as actions from '../actions';
import requireAuth from '../utils/requireAuth';
import Checkout from '../components/Landing/Order/Checkout'

const mapStateToProps = ({auth, order, mercadopago, delivery}) => (
    { auth, order, mercadopago, delivery });
  
export default connect(mapStateToProps, actions)(requireAuth(Checkout));
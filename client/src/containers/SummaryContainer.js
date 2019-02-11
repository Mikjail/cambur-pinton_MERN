import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as actions from '../actions';
import Summary from '../components/Landing/Order/Food/Summary';

const mapStateToProp = ({products}) => ({products});

export default connect(mapStateToProp, actions)(withRouter(Summary));


import { connect } from 'react-redux';
import Landing from '../components/Landing';

const mapStateToProps = ({loader}) => ({loader});


export default connect(mapStateToProps)(Landing);

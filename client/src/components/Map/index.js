import React, {Component} from 'react';
import { connect} from 'react-redux';
import { compose } from 'redux';
import * as actions from '../../actions';
import {Map, GoogleApiWrapper} from 'google-maps-react';
import { GOOGLE_API_KEY } from '../../utils/keys';
import { Contents } from './Content';

export class MapContainer extends Component {
   
  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {}
  };

  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });

  onMapClicked = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      })
    }
  };


    render() {
      const {google, input, error, touched, addDeliveryStatus} = this.props;
        return (
        <Map google={google} 
             visible={false}
             containerStyle={{
              height: '300px',
              position: 'relative',
              width: '100%'
            }}
             >
             <Contents input={input} error={error} touched={touched} addDeliveryStatus={addDeliveryStatus}/>
              
        </Map>
        );
      }

}

export default compose(
  connect(null,actions),
  GoogleApiWrapper({
  apiKey: (GOOGLE_API_KEY)
}))(MapContainer)

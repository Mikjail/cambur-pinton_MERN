import React, {Component} from 'react';
import {Map, Polygon, Marker, InfoWindow} from 'google-maps-react';
import { FREE_ZONE, FIRST_PAID_ZONE, SECOND_PAID_ZONE, DELIVERY } from '../../utils/keys';

export class Contents extends Component {
    state = {
      position: null,
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
      outsideRange: ""
    };
  
    componentDidMount(){
      this.renderAutoComplete();
    }
    
    componentDidUpdate(prevProps) {
      if (this.props.map !== prevProps.map) this.renderAutoComplete();
    }

    handleChange(e) {
      const target = e.target;
      const value =  target.value;
      this.setState({address: value});
  }
  
    renderAutoComplete() {
      const { google, map } = this.props;
      const {lat, lng} = this.state;
      if (!google || !map) return;
    
      const options= {
        location:{lat:-34.603722, lng:-58.381592},
        radius: 500,
        types: ['address'],
        componentRestrictions: {country: 'ar'}
      }
      let rangoGratuito  = new google.maps.Polygon({paths: FREE_ZONE})
      let segundoRango = new google.maps.Polygon({paths: FIRST_PAID_ZONE})
      let tercerRango = new google.maps.Polygon({paths: SECOND_PAID_ZONE})
      const autocomplete = new google.maps.places.Autocomplete(this.autocomplete, options);
      
      autocomplete.bindTo('bounds', map);
      
      autocomplete.addListener('place_changed', () => {

        let isInsideRadius= false;
  
        let placeValue =this.props.input.value
        
        const place = autocomplete.getPlace();

        if (!place.geometry) return;
        
        let latLngMap  =  {lat: place.geometry.location.lat(), lng: place.geometry.location.lng() }

            try{
              if(google.maps.geometry.poly.containsLocation(place.geometry.location, rangoGratuito)){
                this.props.addDeliveryStatus({radius: 'firstRadius', ...latLngMap});
                isInsideRadius=true;

              }else if(google.maps.geometry.poly.containsLocation(place.geometry.location, segundoRango)){
                this.setState({ lat:latLngMap.lat, lng: latLngMap.lng})
                this.props.addDeliveryStatus({ radius: 'secondRadius',  ...latLngMap});
                isInsideRadius=true
              } else if(google.maps.geometry.poly.containsLocation(place.geometry.location, tercerRango)){
                this.setState({ lat:latLngMap.lat, lng: latLngMap.lng})
                this.props.addDeliveryStatus({ radius: 'thirdRadius',  ...latLngMap});
                isInsideRadius=true
              }
              if(isInsideRadius){
                let zone = place.vicinity !== placeValue.split(', ')[1]? `, ${place.vicinity}`: ''
                this.props.input.onChange(`${placeValue}${zone}`)
                this.setState({outsideRange:""})
              }else{
                this.props.input.onChange("")
                this.setState({outsideRange:"Direccion fuera de rango"})
              }
              
            }catch(error){
              console.log(error);
            } 
            
            if (place.geometry.viewport && isInsideRadius){
              map.fitBounds(place.geometry.viewport);
              this.setState({ position: place.geometry.location });
            }     
        
          
          
       
       
      });
    }
  
    render() {
      const { position, outsideRange } = this.state;
      const{ input, error, touched} = this.props;

      return (
        <div className="field-container">
          <div>
              <input
                placeholder="ingrese domicilio"
                {...input}
                ref={ref => (this.autocomplete = ref)}
                onKeyPress={e => {
                  if (e.key === 'Enter') e.preventDefault();}}
                type="text"
              />
              <div className="red-text" style={{marginBottom: '20px', position: 'absolute', top: '50px' }}>
                  {touched && error}
                  </div>
              <div className="red-text" style={{marginBottom: '0px', position: 'relative', top: '0' }}>
                {outsideRange}
              </div>
          </div>
  
          <div>
            <Map
               zoom={12}
               initialCenter={{
                 lat:-34.5920552,
                 lng: -58.4253941
                 }}
              {...this.props}
              center={position}
              gestureHandling='none'
              scaleControl={false}
              mapTypeControl={false}
              streetViewControl={false}
              fullscreenControl={false}

              centerAroundCurrentLocation={false}
              containerStyle={{
                marginTop: '10px',
                height: '200px',
                position: 'relative',
                width: '100%'
              }}>
              <Marker position={position} />
              <Marker
                  title={'Come rico y se feliz!'}
                  name={'Cambur Pintón'}
                  onClick={this.onMarkerClick}
                  position={{lat: -34.5920552, lng:  -58.4253941}}
                  icon={{
                    url:'http://maps.google.com/mapfiles/ms/micons/restaurant.png',
                  }} />
                <Polygon
                  paths={FREE_ZONE}
                  strokeColor='#f39200'
                  strokeOpacity={0.8}
                  strokeWeight={2}
                  fillColor='#697069'
                  fillOpacity={0.35} 
                  onClick={this.onMarkerClick}
                  />
                <Polygon
                    paths={FIRST_PAID_ZONE}
                    strokeColor='#f39200'
                    strokeOpacity={0.8}
                    strokeWeight={2}
                    fillColor='#f39200'
                    fillOpacity={0.35} 
                    />
                    <Polygon
                    paths={SECOND_PAID_ZONE}
                    strokeColor='rgb(165,39,20)'
                    strokeOpacity={0.8}
                    strokeWeight={2}
                    fillColor='rgb(165,39,20)'
                    fillOpacity={0.35} 
                    />
                     <InfoWindow
                      marker={this.state.activeMarker}
                      visible={this.state.showingInfoWindow}>
                        <div>
                          <h5>{this.state.selectedPlace.name}</h5>
                          <p>{this.state.selectedPlace.title}</p>
                        </div>
                    </InfoWindow>
            </Map>
          </div>
        </div>
      );
    }
  }
export default Contents;
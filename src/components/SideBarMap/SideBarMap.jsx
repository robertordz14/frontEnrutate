import React, { Component } from 'react';
import { Map, Marker, GoogleApiWrapper, Polyline } from 'google-maps-react';
import axios from "axios";

import { Logo } from 'react-sidebar-ui';
import { Nav } from 'reactstrap';

import logoEnrutate from '../../assets/img/enrutate.png';
import iconInicio from '../../assets/img/iconInicio.png';
import iconFin from '../../assets/img/iconFin.png';
import Botones from '../Botones/Botones';

import 'react-sidebar-ui/dist/index.css';
import './SideBarMap.css';

export class SideBarMapRoutes extends Component {
  constructor(props) {
    super(props);    
    this.state = {     
      count: 0,
      icon: 0,                               
      busStop: Number.parseInt(this.props.id),
      rutaID: null,
      polylineGreen: null,
      polylineOrange: null,
      routes: [],
      originLineOne: { lat: 24.80661759339234, lng:  -107.39118227883854 },
      destinationLineOne: { lat: 21.884454222315508, lng: -102.3029899437197 },
      originLineTwo: { lat: 24.80661759339234, lng: -107.39118227883854 },
      destinationLineTwo: { lat: 21.884454222315508, lng: -102.3029899437197 },
      lineCoordinatesExample: [
        { lat: 24.80661759339234, lng: -107.39118227883854 },
        { lat: 21.884454222315508, lng: -102.3029899437197 },
        { lat: 21.884554222315508, lng: -102.3030899437197 },
        { lat: 21.884654222315508, lng: -102.3031899437197 },
        { lat: 21.884754222315508, lng: -102.3032899437197 },
      ],
      originExample: { lat: 24.80661759339234, lng: -107.39118227883854 },
      destinationExample: { lat: 21.884454222315508, lng: -102.3029899437197 },
      routesExample: []
    }; 
  }

  componentDidMount() {        
    this.methodGet();  
    this.getDirections(this.state.busStop);
  }

  methodGet = () => {    
    const url = `https://enrutate2021.herokuapp.com/api/data/${this.state.busStop}`
    axios.get(url).then(response => {                        
      this.setState({ routes: response.data });   
    });    
  }

  methodLineStart = () =>{        
    const url = `https://enrutate2021.herokuapp.com/api/lineOne/${this.state.rutaID}`;
    axios.get(url).then(response => {          
      var endPoint = response.data.length;                           
      this.setState({polylineGreen: response.data});
      this.setState({originLineOne: response.data[0]});
      this.setState({destinationLineOne: response.data[endPoint]});
      this.componentDidMount();                              
    });                        
}

methodLineEnd = (id) =>{        
    this.setState({ rutaID: id});
    const url = `https://enrutate2021.herokuapp.com/api/lineTwo/${id}`;
    axios.get(url).then(response => {              
      var endPoint = response.data.length;                     
      this.setState({polylineOrange: response.data});
      this.setState({originLineTwo: response.data[0]});
      this.setState({destinationLineTwo: response.data[endPoint]});
      this.methodLineStart();                                         
    });               
}  

getDirections = () => {
    const DirectionsService = new this.props.google.maps.DirectionsService();
    DirectionsService.route(
      {
        origin: this.state.originExample,
        destination: this.state.destinationExample,
        travelMode: this.props.google.maps.TravelMode.DRIVING,
        optimizeWaypoints: true,          
      },
      (result, status) => {
        if (status === this.props.google.maps.DirectionsStatus.OK) {
          this.setState({
            coors: result.routes[0].overview_path,
          });                     
        } else {
          console.error(`error fetching directions ${result}`);
        }
      }
    );
};

animation = () => {    
  var time = setInterval(() =>{            
    if (this.state.icon === "30%") {      
      clearInterval(time);                     
      this.setState({ count: 0 });
    }else{        
      this.setState({ count: (this.state.count + 5) });
      this.setState({ icon: (this.state.count + "%") });        
    }
  },2000);     
};

  render() {
    return (
      <div className="Side">
         <Nav vertical>
            <Logo
            image={logoEnrutate}
            imageName='logo'
            />

            <div className="containerRutas">
              <h6> <b> RUTAS </b> </h6>
              {              
                this.state.routes[0] ?
                  this.state.routes.map((n) =>
                    <button
                      key={n.nombre}
                      className="btn"
                      onClick={(e) => this.methodLineEnd(n.rutaID, e)} 
                    >
                      Nombre: {n.nombre+ "\n" } <b>Frecuencia: </b> {n.frecuencia}
                    </button>
                  )
                : "El código QR escaneado es incorrecto"
              }    
            </div>
            <footer className="containerB">
              <Botones />
            </footer>
          </Nav>

          <div className="containerMap">
          <Map
            google={this.props.google}
            zoom={14}
            initialCenter={this.state.originLineOne ? this.state.originLineOne : this.state.originExample}
            center={this.state.originLineTwo ? this.state.originLineTwo : this.state.originExample}
          >
            <Marker 
              position={this.state.originLineOne ? this.state.originLineOne : this.state.originExample} 
              icon={iconInicio}
            />            
            <Marker 
              position={this.state.originLineTwo ? this.state.originLineTwo : this.state.destinationExample} 
              icon={iconFin} 
            />            

            <Polyline
              geodesic={true}
              path={
                this.state.polylineGreen ? this.state.polylineGreen : this.state.routesExample
              }              
              strokeColor="#F68000"
              options={{
                strokeOpacity: 2,
                strokeWeight: 4,
                fillOpacity: 10,
                icons:[{
                  icon: {
                    path: this.props.google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
                  },
                  offset: '0',
                  // repeat: "60px",
                }]
              }}
            />

            <Polyline
              geodesic={true}
              path={
                this.state.polylineOrange ? this.state.polylineOrange : this.state.routesExample
              }              
              strokeColor="green"
              options={{
                strokeOpacity: 2,
                strokeWeight: 4,
                fillOpacity: 10,
                icons:[{
                  icon: {
                    path: this.props.google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
                  },
                  offset: '0',
                  // repeat: "60px",
                }]
              }}
            />
          </Map>
        </div>
        
      </div>

      );
    }
}


export default GoogleApiWrapper({
  apiKey: ('AIzaSyAfb3MRYco1aN4yaJyXmK8jperHTMJl07E')
})(SideBarMapRoutes)
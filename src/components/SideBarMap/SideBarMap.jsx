import React, { Component } from 'react';
import { Map, Marker, GoogleApiWrapper, Polyline } from 'google-maps-react';
// import { Modal, ModalHeader, ModalBody } from 'reactstrap';
// import CloseIcon from '@material-ui/icons/Close';
import { UncontrolledCollapse, CardBody, Card } from 'reactstrap';
// import { List } from 'reactstrap';
import axios from "axios";

import { Logo } from 'react-sidebar-ui';
import { Nav } from 'reactstrap';

import logoEnrutate from '../../assets/img/enrutate.png';
import iconInicio from '../../assets/img/iconInicio.png';
import iconLocation from '../../assets/img/iconLocation.png';
import iconFin from '../../assets/img/iconFin.png';

import Botones from '../Botones/Botones';

import 'react-sidebar-ui/dist/index.css';
import './SideBarMap.css';

export class SideBarMapRoutes extends Component {
  constructor(props) {
    super(props);    
    this.state = { 
      progress: [],    
      count: null,
      icon: "Mapa",
      markerParada:{},
      statusAnimation: false,                              
      busStop: Number.parseInt(this.props.id),
      rutaID: null,
      polylineGreen: null,
      polylineOrange: null,
      routes: [],
      dataRuta: [],
      originLineOne: {},
      destinationLineOne: { lat: 21.884454222315508, lng: -102.3029899437197 },
      originLineTwo: {},
      destinationLineTwo: { lat: 21.884454222315508, lng: -102.3029899437197 },
      lineCoordinatesExample: [
        { lat: 21.921338304212593, lng: -102.29783418706253 },
        { lat: 21.884454222315508, lng: -102.3029899437197 },
        { lat: 21.884554222315508, lng: -102.3030899437197 },
        { lat: 21.884654222315508, lng: -102.3031899437197 },
        { lat: 21.884754222315508, lng: -102.3032899437197 },
      ],
      originExample: {},
      destinationExample: { lat: 21.884454222315508, lng: -102.3029899437197 },
      routesExample: []
    }; 
  }
  componentDidMount = () => {
    this.methodGet();  
    this.paradaGet();
    this.getDirections(this.state.busStop);
      this.methodGet(); 
      console.log(this.props.id);           
      setInterval(() => {            
          if (this.state.count === 100) {                
              this.setState({ 
                  count: 0,                 
              });        
          }else{
              this.setState({
                  count: this.state.count + 0.5,
                  icon: this.state.count + "%",
              });
          }
      }, 50);
    };

  methodGet = () => {    
    const url = `https://enrutate2021.herokuapp.com/api/data/${this.state.busStop}`
    axios.get(url).then(response => {                        
      this.setState({ routes: response.data });   
    });    
  }

  paradaGet = () => {    
    const url = `https://enrutate2021.herokuapp.com/api/parada/${this.state.busStop}`
    axios.get(url).then(response => {      
      this.setState({markerParada: response.data[0] });        
    });    
  }

  methodLineStart = () =>{        
    const url = `https://enrutate2021.herokuapp.com/api/lineOne/${this.state.rutaID}`;
    axios.get(url).then(response => {          
      var endPoint = response.data.length;                           
      this.setState({polylineGreen: response.data,
        originLineOne: response.data[0],
        destinationLineOne: response.data[endPoint],
        statusAnimation: true,
      });
    });                      
}

methodLineEnd = (id) =>{        
    this.setState({ rutaID: id});
    const url = `https://enrutate2021.herokuapp.com/api/lineTwo/${id}`;
    axios.get(url).then(response => {              
      var endPoint = response.data.length;          
      console.log(endPoint);
      console.log(response);  
      this.setState({polylineOrange: response.data,
        originLineTwo: response.data[0],
        destinationLineTwo: response.data[endPoint],
        statusAnimation: true,
        count: 0,
        markerParada: this.state.markerParada,
      });
      this.methodLineStart();    
      this.paradaGet();                                     
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

  render() {
    return (
      <div className="Side">
         <Nav vertical>
            <Logo
            image={logoEnrutate}
            imageName='logo'
            />
            <div className="containerRutas" >
              <h6> <b> RUTAS CERCANAS </b> </h6>
              {              
                this.state.routes[0] ?
                  this.state.routes.map((n) =>
                    <button
                      key={n.nombre}
                      className="btn"
                      onClick={(e) => this.methodLineEnd(n.rutaID, e)}
                    >
                      {n.nombre+ '\n'}
                      <button className="btnInfo" id="toggler" key={n.nombre}> <small>Más información</small> </button>
                      <UncontrolledCollapse toggler="#toggler" className="btn">
                        <Card>
                          <CardBody>
                              <small>Nombre: {n.nombre+`\n`} Frecuencia: {n.frecuencia+`\n`} Inicio: {n.inicio+`\n`} Fin: {n.fin+`\n`}</small>
                          </CardBody>
                        </Card>
                      </UncontrolledCollapse>
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
            zoom={15}
            center={this.state.markerParada ? this.state.markerParada : []}
            initialCenter={this.state.originLineOne ? this.state.originLineOne : []} 
            mapTypeControl={false}
          >
            <Marker 
              position={this.state.originLineOne ? this.state.originLineOne : this.state.markerParada} 
              icon={iconInicio}
            />  
            <Marker 
              position={this.state.originLineTwo ? this.state.originLineTwo : this.state.markerParada} 
              icon={iconFin} 
            />            
            <Marker 
              position={this.state.markerParada} 
              icon={iconLocation} 
            />    
            <Polyline
              geodesic={true}
              path={
                this.state.polylineGreen ? this.state.polylineGreen : []
              }              
              options={{
                strokeOpacity: 2,
                strokeWeight: 4,
                fillOpacity: 10,
                strokeColor:"#349dd9",
                icons:[{
                  icon: {
                    path: this.props.google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
                  },
                  offset: this.state.icon,
                  repeat: "200px",
                }],
              }}
            />
            <Polyline
            geodesic={true}     
              path={
                this.state.polylineOrange ? this.state.polylineOrange : []
              }  
              interval={10}       
              options={{
                strokeOpacity: 2,
                strokeWeight: 4,
                fillOpacity: 10,
                strokeColor:"green",
                icon: 'M -2,-2 2,2 M 2,-2 -2,2',
                repeat: "200px",
                icons:[{
                  icon: {
                    path: this.props.google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
                  },
                  offset: this.state.icon,
                }]
              }}
            />
          </Map>
        </div>
        
        <footer className="containerB2">
              <Botones />
        </footer>
      </div>

      );
    }
}

export default GoogleApiWrapper({
  apiKey: ('AIzaSyAfb3MRYco1aN4yaJyXmK8jperHTMJl07E')
})(SideBarMapRoutes)
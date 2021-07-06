import React, { Component } from 'react';
import { Map, Marker, GoogleApiWrapper, Polyline } from 'google-maps-react';
import { Modal, ModalHeader, ModalBody, Navbar, Nav } from 'reactstrap';
import CloseIcon from '@material-ui/icons/Close';
import ZoomOutMapIcon from '@material-ui/icons/ZoomOutMap';
import Fab from '@material-ui/core/Fab';

import googleMapStyles from './GoogleMapStyles';

import axios from "axios";

import { Logo } from 'react-sidebar-ui';

import logoEnrutate from '../../assets/img/enrutate.png';
import iconInicio from '../../assets/img/iconInicio.png';
import iconFin from '../../assets/img/iconFin.png';
import iconLocation from '../../assets/img/iconLocation.png';
import camionEnrutateLateral from '../../assets/img/enrutateCamionLateral.png';
import smileEnrutate from '../../assets/img/smileEnrutate.png'
import iconSideRutas from '../../assets/img/iconRutas.png';

import Buttons from '../Buttons/Buttons';
import Symbols from '../Symbols/Symbols';
import SymbolsMobile from '../SymbolsMobile/SymbolsMobile';

import 'react-sidebar-ui/dist/index.css';
import './SideBarMap.css';


export class SideBarMapRoutes extends Component {
  constructor(props) {
    super(props);    
    this.state = { 
      modalInfo: false,
      modalSide: false,
      progress: [],  
      bandera: false,  
      count: null,
      zoom: 0,
      icon: "Mapa",
      markerParada:{},
      statusAnimation: false,                              
      busStop: Number.parseInt(this.props.id),
      rutaID: null,
      polylineGreen: null,
      polylineOrange: null,
      routes: [],
      rutaDefined: null,
      rutaDefinedName: null,
      dataRuta: null,
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
  toggle = () => {
    this.setState({modalInfo:false})
  }
  toggleSide= () => {
    this.setState({modalSide:true})
  } 
  toggleSide2 = () => {
  this.setState({modalSide:false})
  } 
  componentDidMount = () => {
    this.methodGet();  
    this.paradaGet();
      this.methodGet(); 
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
      this.setState({ 
        routes: response.data,
        rutaDefined: response.data[0].rutaID,
        rutaDefinedName: response.data[0].nombre
       });
    });   
    setTimeout(() =>{
      this.methodDefault();
    }, 1000)
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
    const url2 = `https://enrutate2021.herokuapp.com/api/modal/${id}`;
    axios.get(url2).then(response => {
      this.setState({
        dataRuta: response.data
      })
    });
    axios.get(url).then(response => {              
      var endPoint = response.data.length;          
      this.setState({polylineOrange: response.data,
        originLineTwo: response.data[0],
        destinationLineTwo: response.data[endPoint],
        statusAnimation: true,
        count: 0,
        markerParada: this.state.markerParada,
        modalInfo: true,
        modalSide: false,
        zoom: 15
      });
      this.methodLineStart();    
      this.paradaGet(); 
    });
  }  
  methodDefault = () => {
    const url = `https://enrutate2021.herokuapp.com/api/lineTwo/${this.state.rutaDefined}`;
    axios.get(url).then(response => {              
      var endPoint = response.data.length;          
      this.setState({polylineOrange: response.data,
        originLineTwo: response.data[0],
        destinationLineTwo: response.data[endPoint],
        statusAnimation: true,
        count: 0,
        markerParada: this.state.markerParada,
        modalInfo: false,
        modalSide: false
      });
    });
    this.methodDefault2();
  }
  methodDefault2 = () => {
    const url2 = `https://enrutate2021.herokuapp.com/api/lineOne/${this.state.rutaDefined}`;
    axios.get(url2).then(response => {          
      var endPoint = response.data.length;                           
      this.setState({polylineGreen: response.data,
        originLineOne: response.data[0],
        destinationLineOne: response.data[endPoint],
      });
    }); 
  }
  buttonZoom = () => {
    this.setState({
      bandera: !this.state.bandera
    })
    if(this.state.bandera === true){
      this.setState({
        zoom: 15
      })
      this.paradaGet();
    }else{
      this.setState({
        zoom: 12
      })
      this.paradaGet();
    }
  }

  render() {
    var myDate = new Date();
    // var hora = myDate.getHours() + ':' + myDate.getMinutes();
    return (
      <div className="Side">
         <Nav vertical className="navNoSm">
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
                      className="btn btnRutas"
                      onClick={(e) => this.methodLineEnd(n.rutaID, e)}
                    >
                      {n.nombre+ '\n'}
                    </button>
                  )
                : "El código QR escaneado es incorrecto"
              }   
            </div>

            <div className="containerB">
              <Buttons />
            </div>

          </Nav>

          <Navbar color="faded" light className="navSm">
          <img src={iconSideRutas} alt="Rutas" srcSet="" className="iconSideRoutes" onClick={this.toggleSide}  />
           <img src={smileEnrutate} alt="Enrutate" srcSet=""  className="smileEnru" />
          </Navbar>

          <Modal isOpen={this.state.modalSide} toggle={this.toggleSide2} className="ModalSide" >
                <ModalBody className="navSmSide" style={{border: 'none'}}>
                  <Logo
                  image={logoEnrutate}
                  imageName='logo'
                  className='logoEnruSide'
                  />
                  <div className="containerRutasSm" >
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
                          </button>
                        )
                      : "El código QR escaneado es incorrecto"
                    }   
                  </div>
                    <div className="containerBM" >
                    <Buttons /> 
                    </div>
                </ModalBody>
          </Modal>

          <Modal isOpen={this.state.modalInfo} toggle={this.toggle} className="ModalInfo" >
          <CloseIcon onClick={this.toggle} className="iconCloseM" />
            <ModalHeader className="HeaderModal">
              <small style={{marginLeft: '20px'}}><b>{this.state.dataRuta ? this.state.dataRuta[0].nombre : ""}</b></small>
            </ModalHeader>
            <ModalBody className="modalBody">
                <p><b>Frecuencia: </b>{this.state.dataRuta ? this.state.dataRuta[0].frecuencia : ""} min</p>
                <p><b>Inicio: </b>{this.state.dataRuta ? this.state.dataRuta[0].inicio : ""}</p>
                <p><b>Fin: </b>{this.state.dataRuta ? this.state.dataRuta[0].fin : ""}</p>
                <p><b>Duracion: </b>{this.state.dataRuta ? this.state.dataRuta[0].duracion : ""} min</p>
                <img src={camionEnrutateLateral} alt="Enrutate" srcSet=""  className="camionEnru" />
            </ModalBody>
          </Modal>

          <div className="containerSymbols">
            <Symbols
            ruta={this.state.dataRuta ? this.state.dataRuta[0].nombre : this.state.rutaDefinedName}
             />
          </div>

          <div className="containerSymbolsMobile">
            <SymbolsMobile />
          </div>

          <div className="containerMap">
          <Map
            google={this.props.google}
            zoom={this.state.zoom ? this.state.zoom : 15}
            center={this.state.markerParada ? this.state.markerParada : {lat:24.806627861836812, lng:-107.39113741811012}}
            mapTypeControl={false}
            zoomControl={false}
            disableDefaultUI={true}
             // if hora > 1 && hora < 7{
            //     mapa noche
            //   }else if hora > 19 {
            //     mapa noche
            //   } else {
            //     mapa dia
            //   }
            styles={myDate.getHours() >= 0  && myDate.getHours() <= 7 || myDate.getHours() >= 20 ? this.props.StyleNight : this.props.Style}
            >
            <Marker 
              position={this.state.originLineOne ? this.state.originLineOne : []} 
              icon={iconInicio}
            />  
            <Marker 
              position={this.state.originLineTwo ? this.state.originLineTwo : []} 
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
                strokeColor:"#07BD07",
                icons:[{
                  icon: {
                    path: this.props.google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
                  },
                  repeat: "40%",
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
                strokeColor:"#F54500",
                icons:[{
                  icon: {
                    path: this.props.google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
                  },
                  repeat: "40%",
                }]
              }}
            />
          </Map>
        </div>
        
        <Fab color="secondary" size="small" onClick={this.buttonZoom} className="btnZoom">
            <ZoomOutMapIcon />
          </Fab>

        <div className="containerB2">
              <Buttons />
        </div>
     
      </div>
      );
    }
}

SideBarMapRoutes.defaultProps = googleMapStyles;


export default GoogleApiWrapper({
  apiKey: ('AIzaSyAfb3MRYco1aN4yaJyXmK8jperHTMJl07E')
})(SideBarMapRoutes)
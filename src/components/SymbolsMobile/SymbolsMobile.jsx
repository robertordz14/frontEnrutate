import React from 'react';
import { Alert } from 'reactstrap';

import iconInicio from '../../assets/img/iconInicio.png';
import iconFin from '../../assets/img/iconFin.png';
import iconLocation from '../../assets/img/iconLocation.png';
import lineInicio from '../../assets/img/lineSt.png';
import lineFin from '../../assets/img/lineFin.png';

import './SymbolsMobile.css'

const SymbolsMobile = (props) => {
  return (
      <div className="alertsContainer">
     <Alert  className="rounded containerSymbolsM" style={{paddingTop: '2%'}}>
        <img src={iconInicio} alt="" srcSet="" style={{marginRight: '3px'}}  className="marker"  />
         <small style={{marginRight: '15px'}}><b>Inicio</b></small>
         
         <img src={iconFin} alt="" srcSet="" style={{marginRight: '3px'}} className="marker"  />
         <small style={{marginRight: '15px'}}><b>Fin</b></small>
         
         <img src={lineInicio} alt="" srcSet="" style={{marginRight: '5px'}}  className="line"  />
         <small style={{marginRight: '15px'}}><b>Ida</b></small>         
         
         <img src={lineFin} alt="" srcSet="" style={{marginRight: '5px'}}  className="line"  />
         <small style={{marginRight: '15px'}}><b>Vuelta</b></small>         
         
         <img src={iconLocation} alt="" srcSet="" style={{marginRight: '5px'}}  className="marker"  />
         <small><b>Ubicación</b></small>
     </Alert>
    </div>
);
};

export default SymbolsMobile;
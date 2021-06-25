import React from 'react';
import { Alert } from 'reactstrap';

import iconInicio from '../../assets/img/iconInicio.png';
import iconFin from '../../assets/img/iconFin.png';
import iconLocation from '../../assets/img/iconLocation.png';

const SymbolsMobile = (props) => {
  return (
      <div className="alertsContainer ">
     <Alert  className="rounded containerSymbolsMobile">
        <img src={iconInicio} alt="" srcSet="" style={{marginRight: '3px'}} />
         <small style={{marginRight: '15px'}}><b>Inicio</b></small>
         
         <img src={iconFin} alt="" srcSet="" style={{marginRight: '3px'}} />
         <small style={{marginRight: '15px'}}><b>Fin</b></small>
         
         <img src={iconLocation} alt="" srcSet="" style={{marginRight: '3px'}} />
         <small><b>Ubicación</b></small>
     </Alert>
    </div>
);
};

export default SymbolsMobile;
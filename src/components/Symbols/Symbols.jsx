import React from 'react';
import { Toast, ToastBody, ToastHeader } from 'reactstrap';
import { List } from 'reactstrap';

import iconInicio from '../../assets/img/iconInicio.png';
import iconFin from '../../assets/img/iconFin.png';
import iconLocation from '../../assets/img/iconLocation.png';
import lineInicio from '../../assets/img/lineSt.png';
import lineFin from '../../assets/img/lineFin.png';

import './Symbols.css'

const Symbols = (props) => {
    return (
        <div className="p-3 my-2 rounded">
        <Toast className="symbolsContainer">
          <ToastHeader style={{textAlign:'center'}}>
           {props.ruta}
          </ToastHeader>
          <ToastBody >
          <List type="unstyled" className="listSymbols">
                <li>
                    <img src={iconInicio} alt="" srcSet=""  className="marker" />
                    <small><b>Inicio</b></small>
                </li>
                <li>
                    <img src={iconFin} alt="" srcSet="" className="marker" />
                    <small><b>Fin</b></small>
                </li>             
                <li>
                    <img src={lineInicio} alt="" srcSet="" className="line" />
                    <small><b>Ida</b></small>
                </li>
                <li>
                    <img src={lineFin} alt="" srcSet="" className="line" />
                    <small><b>Vuelta</b></small>
                </li>            
                <li>
                    <img src={iconLocation} alt="" srcSet="" className="marker" />
                    <small><b>Ubicación</b></small>
                </li> 
          </List>
            <div className="symbolsMobileV">
            <img src={iconInicio} alt="" srcSet="" style={{marginRight: '3px'}}  className="marker"  />
            <small style={{marginRight: '15px'}}><b>Inicio</b></small>
         
            <img src={iconFin} alt="" srcSet="" style={{marginRight: '3px'}} className="marker"  />
            <small style={{marginRight: '15px'}}><b>Fin</b></small>
            
            <img src={lineInicio} alt="" srcSet="" style={{marginRight: '5px'}}  className="line"  />
            <small style={{marginRight: '15px'}}><b>Ida</b></small>         
            
            <img src={lineFin} alt="" srcSet="" style={{marginRight: '5px'}}  className="line"  />
            <small style={{marginRight: '15px'}}><b>Vuelta</b></small>         
            
            <img src={iconLocation} alt="" srcSet="" style={{marginLeft: '30%'}}  className="marker"  />
            <small style={{marginLeft: '5px'}}><b>Ubicación</b></small>
            </div>         
          </ToastBody>
        </Toast>
      </div>
      );
};
    
export default Symbols;
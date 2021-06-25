import React from 'react';
import { Toast, ToastBody, ToastHeader } from 'reactstrap';
import { List } from 'reactstrap';

import iconInicio from '../../assets/img/iconInicio.png';
import iconFin from '../../assets/img/iconFin.png';
import iconLocation from '../../assets/img/iconLocation.png';

import './Symbols.css'

const Symbols = (props) => {
    return (
        <div className="p-3 my-2 rounded">
        <Toast className="symbolsContainer">
          <ToastHeader style={{textAlign:'center'}}>
           {props.ruta}
          </ToastHeader>
          <ToastBody>
          <List type="unstyled">
              <li>
                  <img src={iconInicio} alt="" srcSet="" />
                  <small><b>Inicio</b></small>
              </li>
              <li>
                  <img src={iconFin} alt="" srcSet="" />
                  <small><b>Fin</b></small>
              </li>             
              <li>
                  <img src={iconLocation} alt="" srcSet="" />
                  <small><b>Ubicación</b></small>
              </li>
          </List>
          </ToastBody>
        </Toast>
      </div>
      );
};
    
export default Symbols;
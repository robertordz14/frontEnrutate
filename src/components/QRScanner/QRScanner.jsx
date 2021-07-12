import React, {useState} from 'react';
import QrScan from 'react-qr-reader';
import { Logo } from 'react-sidebar-ui';
import logoEnrutate from '../../assets/img/enrutate.png';
import './QRScanner.css';

const QRScanner = (props) => {
    const [qrscan, setQrscan] = useState('Ningun QR escaneado');
    const handleScan = data => {
        if (data) {
            setQrscan(data)
            if(qrscan !== "Ningun QR escaneado"){
              alerta()
            }
        }
    }
    const handleError = err => {
    console.error(err)
    }

       return (
           <div className="body html">
               <div className="escaneador">
                <Logo
                    image={logoEnrutate}
                    imageName='logo'
                  />
                  <h5 className="text"><b>Escanea el código QR</b></h5>
                    <div className="lector">
                      <QrScan 
                          delay={300}
                          onError={handleError}
                          onScan={handleScan}
                          style={{ height: 240, width: 320 }}
                      />
                      </div>
              </div>
            {/* <div>
             <Button href={qrscan}>Ir a la pagina</Button>            
            </div> */} 
                <div className="ciudad"></div>
                <div className="camionAnimated2">
                    <div className="marco"></div>
                </div>
           </div>
    );

    function alerta(){
      var otros = window.confirm("Codigo QR escaneado con exito, ¿desea abrir la página?");
      if (otros === true) {
           window.location.href=(qrscan)
        // console.log(qrscan);
       } else {
         window.alert("Escaneo cancelado")
      }
    }

  }
  
  export default QRScanner;
import React, { useState } from 'react';
import { Modal, ModalBody } from 'reactstrap';
import CloseIcon from '@material-ui/icons/Close';
import bannerEnrutate from '../../assets/img/bannerEnru.png';
import camionEnrutateLateral from '../../assets/img/enrutateCamionLateral.png';
import imgPlayStore from '../../assets/img/googlePlay.png';
import imgAppleStore from '../../assets/img/appStore.png';
import './ModalBanner.css';

const ModalBanner = (props) => {

  const [modal, setModal] = useState(true);
  const toggle = () => setModal(!modal);

  return (
    <div>
      <Modal isOpen={modal} toggle={toggle} className="MadalBa">
        <ModalBody style={{backgroundColor: '#FAB719'}} className="modalBody">
        <CloseIcon onClick={toggle} className="iconClose" style={{backgroundColor: '#FAB719'}} />
        <img src={bannerEnrutate} alt="Banner" srcSet="" className="bannerModal" />
        <div className="containerBotones">
          <a href="https://play.google.com/store/apps/details?id=com.esoftmovil.enrutate&hl=es_419" rel="noreferrer"  target="_blank">
            <img src={imgPlayStore} alt=""className="playStore" />
          </a>
          <a href="https://apps.apple.com/mx/app/enrutate/id1087679011?l=es&ls=1" rel="noreferrer" target="_blank">
            <img src={imgAppleStore} alt="" className="appleStore" />
          </a>    
        </div>
        <img src={camionEnrutateLateral} alt="Enrutate" srcSet=""  className="camionEnru" />
        </ModalBody>
      </Modal>
    </div>
  );
}

export default ModalBanner;

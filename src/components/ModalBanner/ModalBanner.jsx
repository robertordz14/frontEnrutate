import React, { useState } from 'react';
import { Modal, ModalBody} from 'reactstrap';
import CloseIcon from '@material-ui/icons/Close';
import bannerEnrutate from '../../assets/img/bannerEnrutate.jpg';
import camionEnrutateLateralfrom from '../../assets/img/enrutateCamionLateral.png';
import './ModalBanner.css';

const MadalBanner = (props) => {

  const [modal, setModal] = useState(true);
  const toggle = () => setModal(!modal);


  return (
    <div>
      <Modal isOpen={modal} toggle={toggle} className="MadalBa" style={{top: '10%'}}>
        <ModalBody style={{backgroundColor: '#FAB719'}}>
        <CloseIcon onClick={toggle} className="iconClose" style={{backgroundColor: '#FAB719'}} />
        <img src={bannerEnrutate} alt="Banner" srcSet="" className="bannerModal" />
        <img src={camionEnrutateLateralfrom} alt="Enrutate" srcSet=""  className="camionEnru" />
        </ModalBody>
      </Modal>
    </div>
  );
}

export default MadalBanner;
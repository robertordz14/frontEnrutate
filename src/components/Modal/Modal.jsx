import React, { useState } from 'react';
import { Modal, ModalBody } from 'reactstrap';
import CloseIcon from '@material-ui/icons/Close';
import bannerEnrutate from '../../assets/img/bannerEnrutate.jpg';
import './Modal.css';

const MadalBanner = (props) => {

  const [modal, setModal] = useState(true);
  const toggle = () => setModal(!modal);


  return (
    <div>
      <Modal isOpen={modal} toggle={toggle} className="MadalBa" style={{top: '10%'}}>
        <ModalBody style={{backgroundColor: '#FAB719'}}>
        <CloseIcon onClick={toggle} className="iconClose" style={{backgroundColor: '#FAB719'}} />
        <img src={bannerEnrutate} alt="Banner" srcSet="" className="bannerModal" />
        </ModalBody>
      </Modal>
    </div>
  );
}

export default MadalBanner;
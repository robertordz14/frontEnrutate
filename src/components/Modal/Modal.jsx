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
      <Modal isOpen={modal} toggle={toggle} classNames="MadalBa">
        <ModalBody>
        <CloseIcon onClick={toggle} className="iconClose" />
        <img src={bannerEnrutate} alt="Banner" srcset="" className="bannerModal" />
        </ModalBody>
      </Modal>
    </div>
  );
}

export default MadalBanner;
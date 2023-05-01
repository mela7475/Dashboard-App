import React from "react";
import {Modal, Button} from 'react-bootstrap';

const AlertModal = (props) => (  
      <>
        <Modal
          show={props.show}
          onHide={props.handleClose}
          keyboard={false}
          centered
        >
          <Modal.Header className={props.alertColor}>
            <Modal.Title className="text-light"><i className={props.alertIcon}></i>{props.alertTitle}</Modal.Title>
          </Modal.Header>
          <Modal.Body className="bg-white">
            {props.alertText}
          </Modal.Body>
          <Modal.Footer className="bg-light">
            <Button variant="secondary" onClick={props.handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );

export default AlertModal;
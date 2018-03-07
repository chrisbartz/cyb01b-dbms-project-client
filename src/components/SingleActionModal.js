import React from 'react';
import { Modal } from 'react-bootstrap';
import PropTypes from "prop-types";

const SingleActionModal = (props) => {
  // debugger;
  return (
    <Modal show={props.showModal} onHide={props.cancelAction}>
      <Modal.Header closeButton>
        <Modal.Title>{props.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>{props.bodyText}</h4>
        {props.bodyText ?
          <h4 className="bold">{props.boldText}</h4>
          :
          null
        }
      </Modal.Body>
      <Modal.Footer>
        <button className="btn brand-blue-button" onClick={props.confirmAction}>{props.confirmText}</button>
        {props.showCancelButton ?
          <button className="btn brand-gray-button" onClick={props.cancelAction}>{props.cancelText}</button>
          :
          null
        }
      </Modal.Footer>
    </Modal>
  );
};

// SingleActionModal.propTypes = {
//   showModal: PropTypes.bool.isRequired,
//   showCancelButton: PropTypes.bool.isRequired,
//   title: PropTypes.string.isRequired,
//   bodyText: PropTypes.string,
//   boldText: PropTypes.string,
//   cancelText: PropTypes.string,
//   confirmText: PropTypes.string.isRequired,
//   confirmAction: PropTypes.func.isRequired,
//   cancelAction: PropTypes.func.isRequired
// };

export default SingleActionModal;

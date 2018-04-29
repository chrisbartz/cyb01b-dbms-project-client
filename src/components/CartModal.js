import React from 'react';
import {Col, Modal, Row} from 'react-bootstrap';
import PropTypes from "prop-types";

const LoginModal = (props) => {
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
        <b>
          <h4>
            <Row>
              <Col xs={7}>
                Item
              </Col>
              <Col xs={2}>
                Qty
              </Col>
              <Col xs={3}>
                Cost / item
              </Col>
            </Row>
          </h4>
        </b>
        {
          props.pageProps.cart.length > 0 ?
            props.pageProps.cart.map((item, index) => {
              return (
                <h4 key={index}>
                  <Row>
                    <Col xs={7}>
                      {item.name}
                    </Col>
                    <Col xs={2}>
                      {item.qty}
                    </Col>
                    <Col xs={3}>
                      {Math.abs(item.cost).toLocaleString('en-Us', {
                          style: 'currency',
                          currency: 'USD'
                        }
                      )}
                    </Col>
                  </Row>
                </h4>
              );
            })
            :
            null
        }
      </Modal.Body>
      <Modal.Footer>
        <h4>
          Total Items: {props.pageProps.cartItems}  Order Total: {Math.abs(props.pageProps.cartTotal).toLocaleString('en-Us', {
            style: 'currency',
            currency: 'USD'
          }
        )}
        </h4>
        {props.pageProps.cartItems > 0 ?
          <button className="btn brand-blue-button" onClick={props.confirmAction}>{props.confirmText}</button>
        :
        <button disabled="disabled" className="btn brand-blue-button" onClick={props.confirmAction}>{props.confirmText}</button>
        }
        {
          <button className="btn brand-gray-button" onClick={props.clearAction}>{props.clearText}</button>
        }
        {props.showCancelButton ?
          <button className="btn brand-gray-button" onClick={props.cancelAction}>{props.cancelText}</button>
          :
          null
        }
      </Modal.Footer>
    </Modal>
  );
};

LoginModal.propTypes = {
  showModal: PropTypes.bool.isRequired,
  showCancelButton: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  bodyText: PropTypes.string,
  boldText: PropTypes.string,
  cancelText: PropTypes.string,
  confirmText: PropTypes.string.isRequired,
  confirmAction: PropTypes.func.isRequired,
  cancelAction: PropTypes.func.isRequired,
  userField: PropTypes.string,
  restCallActions: PropTypes.object.isRequired,
  passField: PropTypes.string,
  pageProps: PropTypes.object.isRequired
};

export default LoginModal;

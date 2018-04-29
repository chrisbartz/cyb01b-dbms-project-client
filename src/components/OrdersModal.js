import React from 'react';
import {Col, Modal, Panel, Row} from 'react-bootstrap';
import PropTypes from "prop-types";

const OrdersModal = (props) => {
  // debugger;
  return (
    <Modal show={props.showModal} onHide={props.confirmAction}>
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
        {props.pageProps.orders.length > 0 ?
          <h4 className="panel-margins">
            <b>
              <Row>
                <Col xs={4}>
                  Order Id
                </Col>
                <Col xs={3}>
                  Date
                </Col>
                <Col xs={3}>
                  Total
                </Col>
                <Col xs={2}>
                  Status
                </Col>
              </Row>
            </b>
          </h4>
          :
          null
        }

        {
          props.pageProps.orders.length > 0 ?
            props.pageProps.orders.map((order, index) => {
              return (
                <Panel key={index}>
                  <Panel.Body>
                    <div>
                      <h4>
                        <Row>
                          <Col xs={4}>
                            {order.orderId}
                          </Col>
                          <Col xs={3}>
                            {order.date}
                          </Col>
                          <Col xs={3}>
                            {Math.abs(order.total).toLocaleString('en-Us', {
                                style: 'currency',
                                currency: 'USD'
                              }
                            )}
                          </Col>
                          <Col xs={2}>
                            {order.status}
                          </Col>
                        </Row>
                      </h4>
                      <h5>
                        <b>
                          <Row>
                            <Col xs={1}/>
                            <Col xs={5}>
                              Item Name
                            </Col>
                            <Col xs={3}>
                              Cost
                            </Col>
                            <Col xs={3}>
                              Qty
                            </Col>
                          </Row>
                        </b>
                      </h5>
                      {
                        order.orderItems.length > 0 ?
                          order.orderItems.map((orderItem, itemIndex) => {
                            return (
                              <h5 key={itemIndex}>
                                <Row>
                                  <Col xs={1}/>
                                  <Col xs={5}>
                                    {orderItem.item.name}
                                  </Col>
                                  <Col xs={3}>
                                    {Math.abs(orderItem.item.cost).toLocaleString('en-Us', {
                                        style: 'currency',
                                        currency: 'USD'
                                      }
                                    )}
                                  </Col>
                                  <Col xs={3}>
                                    {orderItem.quantity}
                                  </Col>
                                </Row>
                              </h5>
                            );
                          })
                          :
                          null
                      }

                    </div>
                  </Panel.Body>
                </Panel>
              );
            })
            :
            <h4>
              You have no order history
            </h4>
        }
      </Modal.Body>
      <Modal.Footer>
        <button className="btn brand-blue-button" onClick={props.confirmAction}>{props.confirmText}</button>
      </Modal.Footer>
    </Modal>
  );
};

OrdersModal.propTypes = {
  showModal: PropTypes.bool.isRequired,
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

export default OrdersModal;

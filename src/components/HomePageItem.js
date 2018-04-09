import React from 'react';
import PropTypes from 'prop-types';
import {Col, Image, Panel, Row} from 'react-bootstrap';

const HomePageItem = (props) => {
  // debugger;
  return (
    <div>
      {props.item !== undefined ?
        <Panel className='set-width'>
          <Panel.Heading>
            <Panel.Title componentClass="h3"><b>{props.item.name}</b></Panel.Title>
          </Panel.Heading>
          <Panel.Body>
            <Row>
              <Col xs={2}>
                {
                  props.item.pictures !== undefined
                  && props.item.pictures.length > 0 ?
                    <Image src={require('../../images/' + props.item.pictures[0].fileName)} rounded responsive/>
                    :
                    null
                }
              </Col>
              <Col xs={10}>{props.item.description}</Col>
            </Row>
            <Row>
              <h3 className='right-justfy'>{Math.abs(props.item.cost).toLocaleString('en-Us', {
                  style: 'currency',
                  currency: 'USD'
                }
              )}</h3>
            </Row>
          </Panel.Body>
        </Panel>
        :
        null
      }
    </div>

  );
};

HomePageItem.propTypes = {
  restCallActions: PropTypes.object.isRequired,
  item: PropTypes.object.isRequired
};

export default HomePageItem;

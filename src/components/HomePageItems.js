import React from 'react';
import PropTypes from 'prop-types';
import HomePageItem from './HomePageItem';
import {Row, Col} from 'react-bootstrap';

const HomePageItems = (props) => {
  // debugger;
  return (
    <div>
      {props.pageProps.inputSearch !== undefined && props.pageProps.inputSearch.length > 0 ?
      <h3>Your Search: {props.pageProps.inputSearch}</h3>
        :
        null
      }

      {props.pageProps.pageContent !== undefined
      && props.pageProps.pageContent.items !== undefined
      && props.pageProps.pageContent.items.length > 0 ?
        props.pageProps.pageContent.items.map((item, index) => {
          return (
            <HomePageItem
            item={item}
            restCallActions={props.restCallActions}
            pageProps={props.pageProps}
            key={index}
            />
          );
        })
        :
        <Row>
          <Col xs={1}></Col>
          <Col xs={6}>
            <h3>
              has returned 0 items...
            </h3>
          </Col>
        </Row>
      }
    </div>

  );
};

HomePageItems.propTypes = {
  restCallActions: PropTypes.object.isRequired,
  pageProps: PropTypes.object.isRequired
};

export default HomePageItems;

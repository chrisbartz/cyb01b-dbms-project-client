import React from 'react';
import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';
import { Navbar, NavItem, Nav } from 'react-bootstrap';


const ToolBar = (props) => {
  // debugger;
  return (
    <div>
      <Navbar inverse>
        <Navbar.Brand>
          ORCA eCommerce
        </Navbar.Brand>
        <Nav>
          <NavItem eventKey={1}>Home</NavItem>
          <NavItem eventKey={2}>Catch of the Day</NavItem>
        </Nav>
        <Nav pullRight>
          <NavItem eventKey={8}>My Account</NavItem>
          <NavItem eventKey={9}>Cart</NavItem>
        </Nav>
        {props.pageProps.customer != null
        && props.pageProps.customer.firstName != null
        && props.pageProps.customer.lastName != null ?
          <p>{props.pageProps.customer.firstName} {props.pageProps.customer.lastName}</p>
          :
          'Please log in'
        }
      </Navbar>
    </div>
  );
};

ToolBar.propTypes = {
  restCallActions: PropTypes.object.isRequired,
  pageProps: PropTypes.object.isRequired
};

export default ToolBar;

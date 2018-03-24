import React from 'react';
import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';
import { Navbar, NavItem, Nav, Button, Row } from 'react-bootstrap';


const ToolBar = (props) => {

  // debugger;
  return (
    <Row>
      <Navbar className="navbar navbar-brand navbar-top">
        <Navbar.Header>
          <Navbar.Brand>
            <a href="#home">{props.pageProps.siteName}</a>
          </Navbar.Brand>
        </Navbar.Header>
        <Nav>
          <NavItem eventKey={1}>Home</NavItem>
          <NavItem eventKey={2}>Catch of the Day</NavItem>
          <NavItem eventKey={8}>My Account</NavItem>
          <NavItem eventKey={9}>Cart</NavItem>
          <Button className="btn btn-primary" onClick={() => props.restCallActions.submitLogout()}>Log Out</Button>
          </Nav>
      </Navbar>
      {props.pageProps.customer != null
      && props.pageProps.customer.firstName != undefined
      && props.pageProps.customer.lastName != undefined ?
        <p>{props.pageProps.customer.firstName} {props.pageProps.customer.lastName}</p>
        :
        'Please log in'
      }
    </Row>
  );
};

ToolBar.propTypes = {
  restCallActions: PropTypes.object.isRequired,
  pageProps: PropTypes.object.isRequired
};

export default ToolBar;

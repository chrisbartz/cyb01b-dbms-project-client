import React from 'react';
import PropTypes from 'prop-types';
import {Button, FormControl, FormGroup, MenuItem, Nav, Navbar, NavDropdown, NavItem, Row} from 'react-bootstrap';

const ToolBar = (props) => {

  // debugger;
  return (
    <Row>
      <Navbar className="navbar navbar-inverse">
        <Row>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="#">{props.pageProps.siteName}</a>
            </Navbar.Brand>
          </Navbar.Header>
        </Row>
        <Row>
          <Nav>
            <NavItem eventKey={1}>Home</NavItem>
            <NavItem eventKey={2}>Deal of the Day</NavItem>
            <Navbar.Form pullLeft>
              <FormGroup>
                <FormControl
                  type="text"
                  placeholder="Search Items"
                  value={props.pageProps.inputSearch}
                  onChange={(event) => props.restCallActions.updatePageProps("inputSearch", event.target.value)}
                />
              </FormGroup>
              {' '}
              <Button type='submit' onClick={() => props.restCallActions.submitSearch(props.pageProps.inputSearch)}>Search</Button>
            </Navbar.Form>
            <NavItem eventKey={7}>Cart</NavItem>
            <NavDropdown eventKey={8} title="My Account" id="basic-nav-dropdown">
              <MenuItem eventKey={8.1}>{
                props.pageProps.customer != null
                && props.pageProps.customer.firstName !== undefined
                && props.pageProps.customer.lastName !== undefined ?
                  props.pageProps.customer.firstName + ' '
                  + props.pageProps.customer.lastName
                  + ' (' + props.pageProps.customer.userName + ')'
                  :
                  ''
              }</MenuItem>
              <MenuItem eventKey={8.2}>{
                props.pageProps.customer != null
                && props.pageProps.customer.emailAddress !== undefined ?
                  '' + props.pageProps.customer.emailAddress
                  :
                  ''
              }</MenuItem>
              <MenuItem divider/>
              <MenuItem eventKey={8.8} onClick={() => props.restCallActions.submitLogout()}>My Orders</MenuItem>
              <MenuItem eventKey={8.9} onClick={() => props.restCallActions.submitLogout()}>Log Out</MenuItem>
            </NavDropdown>
          </Nav>
        </Row>
      </Navbar>

    </Row>
  );
};

ToolBar.propTypes = {
  restCallActions: PropTypes.object.isRequired,
  pageProps: PropTypes.object.isRequired
};

export default ToolBar;

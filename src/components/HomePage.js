import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { /*Row, Col, */ Button } from 'react-bootstrap';

import * as restCallActions from '../actions/restCallActions';

// This is a class-based component because the current
// version of hot reloading won't hot reload a stateless
// component at the top-level.

class HomePage extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.submitLogin = this.submitLogin.bind(this);
  }

  componentDidMount() {
    // console.log('hello homepage');
    this.props.restCallActions.getTestDataFromApi();
  }

  submitLogin() {
    this.props.restCallActions.submitLogin('cyb01b');
  }

  render() {
    // const activeStyle = { color: 'blue' };
    // debugger;
    console.log(this.props.pageProps.customer);
    console.log(this.props.pageProps.addresses);
    console.log(this.props.pageProps.pageProps);
    return (
      <div>
        {this.props.pageProps.customer != null && this.props.pageProps.customer.firstName != null && this.props.pageProps.customer.lastName != null ?
          <h2>Hello, {this.props.pageProps.customer.firstName}</h2>
          :
          ''
        }
        <h1>eCommerce Store - Partial Products???</h1>

        <h2>{this.props.pageProps != null && this.props.pageProps.testMessage.length > 0 ? this.props.pageProps.testMessage : 'Get Started'}</h2>
        <ol>
          <li>Review the <Link to="/fuel-savings">demo app</Link></li>
          <li>Remove the demo and start coding: npm run remove-demo</li>
        </ol>
        <Button onClick={this.submitLogin}>Login</Button>
      </div>
    );
  }
}

HomePage.propTypes = {
  restCallActions: PropTypes.object.isRequired,
  pageProps: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    pageProps: state.pageProps
  };
}

function mapDispatchToProps(dispatch) {
  return {
    restCallActions: bindActionCreators(restCallActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);

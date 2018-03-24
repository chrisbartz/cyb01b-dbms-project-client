import React from 'react';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { /*Row, Col, */ Button, Alert/*, Modal*/ } from 'react-bootstrap';
import ToolBar from './ToolBar';

import * as restCallActions from '../actions/restCallActions';
import LoginModal from "./LoginModal";

// This is a class-based component because the current
// version of hot reloading won't hot reload a stateless
// component at the top-level.

class HomePage extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.submitLogin = this.submitLogin.bind(this);
    this.clearErrors = this.clearErrors.bind(this);
  }

  componentDidMount() {
    // console.log('hello homepage');
    // this.props.restCallActions.getTestDataFromApi();
  }

  submitLogin(userId) {
    this.props.restCallActions.submitLogin(userId);
  }

  clearErrors() {
    this.props.restCallActions.updatePageProps('errors', []);
  }

  render() {
    // const activeStyle = { color: 'blue' };
    // debugger;
    // console.log(this.props.pageProps.customer);
    // console.log(this.props.pageProps.addresses);
    // console.log(this.props.pageProps.pageProps);
    return (
      <div>
        <ToolBar restCallActions={this.props.restCallActions} pageProps={this.props.pageProps} />


        // page content



        <LoginModal
          showModal={this.props.pageProps.customer.userName==null}
          showCancelButton={false}
          title={"Login to " + this.props.pageProps.siteName}
          bodyText="Hello valued customer, please log in"
          confirmAction={() => this.submitLogin(this.props.pageProps.inputUsername, this.props.pageProps.inputPassword)}
          confirmText="Log in"
          cancelAction={this.props.restCallActions.submitLogout}
          restCallActions={this.props.restCallActions}
          pageProps={this.props.pageProps}
        />

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

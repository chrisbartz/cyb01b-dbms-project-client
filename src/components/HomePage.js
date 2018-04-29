import React from 'react';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import ToolBar from './ToolBar';

import * as restCallActions from '../actions/restCallActions';
import LoginModal from "./LoginModal";
import CartModal from "./CartModal";
import OrdersModal from "./OrdersModal";
import HomePageItems from "./HomePageItems";

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
  }

  submitLogin(userId) {
    this.props.restCallActions.submitLogin(userId);
  }

  clearErrors() {
    this.props.restCallActions.updatePageProps('errors', []);
  }

  render() {
    // debugger;
    return (
      <div>
        <ToolBar className="set-width" restCallActions={this.props.restCallActions} pageProps={this.props.pageProps} />

        <HomePageItems
        restCallActions={this.props.restCallActions}
        pageProps={this.props.pageProps}
        />

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

        <CartModal
          showModal={this.props.pageProps.showCart}
          showCancelButton={true}
          title={this.props.pageProps.siteName + ": Shopping Cart and Checkout"}
          confirmAction={() => this.props.restCallActions.submitOrder(
            this.props.pageProps.cart,
            this.props.pageProps.customer.userName,
            this.props.pageProps.customer.customerId,
            this.props.pageProps.customer.addresses[0].addressId,
            this.props.pageProps.customer.payments[0].paymentId)}
          confirmText="Create Order"
          cancelText="Cancel"
          cancelAction={() => this.props.restCallActions.updatePageProps('showCart', false)}
          clearText="Clear Cart"
          clearAction={() => {
            this.props.restCallActions.updatePageProps('cart', []);
            this.props.restCallActions.updatePageProps('cartTotal', 0);
            this.props.restCallActions.updatePageProps('cartItems', 0);}
          }
          restCallActions={this.props.restCallActions}
          pageProps={this.props.pageProps}
        />

        <OrdersModal
          showModal={this.props.pageProps.showOrders}
          title={this.props.pageProps.siteName + ": Your Order History"}
          confirmAction={() => this.props.restCallActions.updatePageProps('showOrders', false)}
          confirmText="Dismiss"
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

import React from 'react';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { /*Row, Col, */ Button, Alert/*, Modal*/ } from 'react-bootstrap';
import ToolBar from './ToolBar';

import * as restCallActions from '../actions/restCallActions';
import SingleActionModal from "./SingleActionModal";

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

  submitLogin() {
    this.props.restCallActions.submitLogin('cyb01b');
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

        {false && this.props.pageProps.errors != null && this.props.pageProps.errors.length > 0 ?
          <Alert bsStyle="danger" onDismiss={this.clearErrors}>
            <h5>Errors in page:</h5>
            <p>
              {this.props.pageProps.errors.map((error, index) => {
                return (
                  <p key={index}>{index + " - " + error}</p>
                );
              })}
            </p>
            <p>
              <Button onClick={this.clearErrors}>Hide Alert</Button>
            </p>
          </Alert>

          :
          ''
        }


        // page content

        <Button className="btn btn-primary" onClick={this.submitLogin}>Login</Button>

        <SingleActionModal
          showModal={true /*this.props.pageProps.customer.userName==null*/}
          showCancelButton={false}
          title={"Login to " + this.props.pageProps.siteName}
          bodyText="Please log in"
          confirmAction={this.submitLogin()}
          confirmText="Log me in"
          cancelAction={this.props.restCallActions.submitLogout}
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

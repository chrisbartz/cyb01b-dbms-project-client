import fetch from 'isomorphic-fetch';
import * as types from './actionTypes';

const apiUrl = 'http://192.168.1.94:8080/';

export function noAuthGet(url) {
  return fetch(url, {
    method: "GET"
  })
    .then((response) => {
      if(response.headers.get("content-type")) {
        // debugger;
        return response.json();
      }
    });
}

export function noAuthPost(url, form) {
  return fetch(url, {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(form)
    })
    .then((response) => {
      if(response.headers.get("content-type")) {
        // debugger;
        return response.json();
      }
    });
}

export function noAuthPut(url, form) {
  return fetch(url, {
    method: "PUT",
    headers: {
      ContentType: 'application/json'
    },
    body: JSON.stringify(form)
  })
    .then((response) => response);
}

export function noAuthDelete(url) {
  return fetch(url, {
    method: "DELETE"
  })
    .then((response) => response);
}

export function getTestDataFromApi() {
  // console.log('hello pre!');
  return function (dispatch) {
    return noAuthGet(apiUrl + 'hello')
      .then((response) => {
        // console.log('hello post!');
        // console.log(response);
        // debugger;
        return dispatch(updatePageProps('testMessage', response.responseText));
      })
      .catch((error) => {
      console.log(error);
    });
  };
}

export function submitLogin(userId) {
  let userObject = {
    userName: userId
  };
  return function (dispatch) {
    return noAuthPost(apiUrl + 'login', userObject)
      .then((response) => {
        // debugger;
        dispatch(updatePageProps('customer', response.customer));
        dispatch(updatePageProps('addresses', response.customer.addresses));
        dispatch(updatePageProps('errors', response.pageData.errors));
        return dispatch(updatePageProps('pageContent', response.pageData));
      })
      .catch((error) => {
        console.log(error);
      });
  };
}

export function getLandingPageData() {
  return function (dispatch) {
    return noAuthGet(apiUrl + 'hello')
      .then((response) => {
        return dispatch(updatePageProps('landingPage', response.landingPageData));
      })
      .catch((error) => {
        console.log(error);
      });
  };
}

export function updatePageProps(prop, value) {
  return {
    type: types.UPDATE_PAGE_PROPS,
    pageProps: {
      [prop]: value
    }
  };
}

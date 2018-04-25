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
      .catch((/*error*/) => {
      // console.log(error);
    });
  };
}

export function submitLogin(userId) {
  if (userId == undefined || userId.length < 1)
    return;

  let userObject = {
    userName: userId
  };

  return function (dispatch) {
    return noAuthPost(apiUrl + 'login', userObject)
      .then((response) => {
        // debugger;
        if (response.errors != null)
          return dispatch(updatePageProps('loginErrors', response.errors));

        dispatch(updatePageProps('customer', response.customer));
        dispatch(updatePageProps('addresses', response.customer.addresses));
        dispatch(updatePageProps('errors', response.pageData.errors));
        dispatch(updatePageProps('loginErrors', []));
        dispatch(updatePageProps('inputUsername', ''));
        dispatch(updatePageProps('inputPassword', ''));
        dispatch(updatePageProps('inputSearch', ''));
        return dispatch(updatePageProps('pageContent', response.pageData));
      })
      .catch((/*error*/) => {
        // console.log(error);
      });
  };
}

export function submitLogout() {
  return function (dispatch) {
    dispatch(updatePageProps('customer', {}));
    dispatch(updatePageProps('addresses', []));
    dispatch(updatePageProps('errors', {}));
    dispatch(updatePageProps('loginErrors', []));
    dispatch(updatePageProps('inputUsername', ''));
    dispatch(updatePageProps('inputPassword', ''));
    dispatch(updatePageProps('inputSearch', ''));
    return dispatch(updatePageProps('pageContent', {}));
  };
}

export function getHomepageData(userId) {
  return function (dispatch) {
    return noAuthGet(apiUrl + 'homepage' + "?userName=" + userId)
      .then((response) => {
        // debugger;
        if (response.errors != null)
          return dispatch(updatePageProps('loginErrors', response.errors));

        dispatch(updatePageProps('customer', response.customer));
        dispatch(updatePageProps('addresses', response.customer.addresses));
        dispatch(updatePageProps('errors', response.pageData.errors));
        dispatch(updatePageProps('loginErrors', []));
        dispatch(updatePageProps('inputUsername', ''));
        dispatch(updatePageProps('inputPassword', ''));
        dispatch(updatePageProps('inputSearch', ''));
        return dispatch(updatePageProps('pageContent', response.pageData));
      })
      .catch((/*error*/) => {
        // console.log(error);
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

export function submitSearch(searchTerm, userId) {

  if (searchTerm === undefined || searchTerm.length < 3)
    return updatePageProps('errors', ['The search term must be > 3 characters']);

  let query = '?searchTerm=' + searchTerm + "&userName=" + userId;

  return function (dispatch) {
    return noAuthGet(apiUrl + 'search' + query)
      .then((response) => {
        // debugger;
        // if (response.errors != null)
        //   return dispatch(updatePageProps('loginErrors', response.errors));

        dispatch(updatePageProps('errors', response.pageData.errors));
        return dispatch(updatePageProps('pageContent', response.pageData));
      })
      .catch((/*error*/) => {
        // console.log(error);
      });
  };
}

export function addToCart(cart, itemId, itemCost) {
  debugger;

  if (cart === undefined)
    return updatePageProps('errors', ['The cart is invalid']);

  if (itemId === undefined || itemId < 0)
    return updatePageProps('errors', ['The item id must be valid to add it to the cart']);

  if (itemCost === undefined || itemCost < 0)
    return updatePageProps('errors', ['The item cost must be valid to add it to the cart']);

  let itemFound = false;

  for (let i = 0; i < cart.length; i++) {
    if (cart[i].itemId === itemId) {
      cart[i].qty = cart[i].qty + 1;
      itemFound = true;
      break;
    }
  }

  if (!itemFound) {
    let newItem = {
      itemId: itemId,
      qty: 1,
      cost: itemCost
    };

    cart.push(newItem);
  }

  return function (dispatch) {
    return dispatch(updatePageProps('cart', cart));
  };
}

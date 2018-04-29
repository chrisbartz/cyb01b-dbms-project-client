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
        dispatch(updatePageProps('orders', response.orders));
        dispatch(updatePageProps('addresses', response.customer.addresses));
        dispatch(updatePageProps('payments', response.customer.payments));
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
    dispatch(updatePageProps('orders', []));
    dispatch(updatePageProps('addresses', []));
    dispatch(updatePageProps('payments', []));
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
        dispatch(updatePageProps('orders', response.orders));
        dispatch(updatePageProps('addresses', response.customer.addresses));
        dispatch(updatePageProps('payments', response.customer.payments));
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

export function addToCart(cart, itemId, itemName, itemCost) {
  // debugger;

  if (cart === undefined)
    return updatePageProps('errors', ['The cart is invalid']);

  if (itemId === undefined || itemId < 0)
    return updatePageProps('errors', ['The item id must be valid to add it to the cart']);

  if (itemCost === undefined || itemCost < 0)
    return updatePageProps('errors', ['The item cost must be valid to add it to the cart']);

  let newCart = JSON.parse(JSON.stringify(cart));

  let itemFound = false;

  for (let i = 0; i < newCart.length; i++) {
    if (newCart[i].itemId === itemId) {
      newCart[i].qty = newCart[i].qty + 1;
      itemFound = true;
      break;
    }
  }

  if (!itemFound) {
    let newItem = {
      itemId: itemId,
      name: itemName,
      qty: 1,
      cost: itemCost
    };

    newCart.push(newItem);
  }

  let itemsCount = 0;
  let totalCost = 0;

  for (let i = 0; i < newCart.length; i++) {
    if (newCart[i].qty > 0 && newCart[i].cost >= 0) {
      itemsCount += newCart[i].qty;
      totalCost += newCart[i].qty * newCart[i].cost;
    }
  }

  return function (dispatch) {
    dispatch(updatePageProps('cartTotal', totalCost));
    dispatch(updatePageProps('cartItems', itemsCount));
    return dispatch(updatePageProps('cart', newCart));
  };
}


export function submitOrder(cart, userName, userId, addressId, paymentId) {
  // debugger;

  if (cart === undefined)
    return updatePageProps('errors', ['The cart is invalid']);

  if (userName === undefined || userName.length < 3)
    return updatePageProps('errors', ['The userName must be valid']);

  if (userId === undefined || userId < 0)
    return updatePageProps('errors', ['The userId must be valid']);

  if (addressId === undefined || addressId < 0)
    return updatePageProps('errors', ['The addressId must be valid']);

  if (paymentId === undefined || paymentId < 0)
    return updatePageProps('errors', ['The paymentId must be valid']);

  let orderObject = {
    userName: userName,
    userId: userId,
    orderItems: cart,
    addressId: addressId,
    paymentId:paymentId
  };

  return function (dispatch) {
    return noAuthPost(apiUrl + 'submit_order', orderObject)
      .then((response) => {
        // debugger;
        if (response.errors != null)
          return dispatch(updatePageProps('errors', response.errors));

        dispatch(updatePageProps('cartTotal', 0));
        dispatch(updatePageProps('cartItems', 0));
        dispatch(updatePageProps('cart', []));
        dispatch(updatePageProps('orders', response.orders));
        return dispatch(updatePageProps('pageContent', response.pageData));
      })
      .catch((/*error*/) => {
        // console.log(error);
      });
  };
}

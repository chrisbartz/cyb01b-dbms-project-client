import fetch from 'isomorphic-fetch';
import * as types from './actionTypes';

export function noAuthGet(url) {
  return fetch(url, {
    method: "GET"
  })
    .then((response) => response.json());
}

export function noAuthPost(url, form) {
  return fetch(url, {
    method: "POST",
    headers: {
      ContentType: 'application/json'
    },
    body: JSON.stringify(form)
    })
    .then((response) => response);
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
  return function (dispatch) {
    return noAuthGet('localhost:8080/hello')
      .then((response) => {
        console.log('hello!');
        debugger;
        dispatch(updatePageProps('testMessage', response));
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

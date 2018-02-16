import fetch from 'isomorphic-fetch';
import * as types from './actionTypes';

export function noAuthGet(url) {
  return fetch(url, {
    method: "GET"
  })
    .then((response) => {
      if(response.headers.get("content-type")) {
        debugger;
        return response.json();
      }
    });
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
  console.log('hello pre!');
  return function (dispatch) {
    return noAuthGet('http://192.168.1.98:8080/hello')
      .then((response) => {
        console.log('hello post!');
        console.log(response);
        debugger;
        return dispatch(updatePageProps('testMessage', response.responseText));
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

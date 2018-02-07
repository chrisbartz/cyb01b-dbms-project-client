import fetch from 'isomorphic-fetch';

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

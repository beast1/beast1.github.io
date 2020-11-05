'use strict';


const requestTypes = {
  LOAD: `load`,
  UPLOAD: `upload`
};
const http = (requestType, url, onSuccess, onError, data) => {
  const xhr = new XMLHttpRequest();
  xhr.responseType = `json`;
  let method;

  if (requestType === requestTypes.LOAD) {
    method = `GET`;
    xhr.timeout = 10000;

    xhr.addEventListener(`error`, () => {
      onError(window.data.messages.http.errDefault);
    });
    xhr.addEventListener(`timeout`, () => {
      onError(`${window.data.messages.http.timeout.pre} ${xhr.timeout} ${window.data.messages.http.timeout.post}`);
    });
  } else if (requestType === requestTypes.UPLOAD) {
    method = `POST`;
  }

  xhr.addEventListener(`load`, () => {
    let err;
    switch (xhr.status) {
      case window.data.statusDictionary.success:
        if (requestType === requestTypes.LOAD) {
          onSuccess(xhr.response);
        } else if (requestType === requestTypes.UPLOAD) {
          onSuccess(window.data.messages.http.success);
        }
        break;
      case window.data.statusDictionary.badRequest:
        err = window.data.messages.http.err400;
        break;
      case window.data.statusDictionary.missingAuth:
        err = window.data.messages.http.err401;
        break;
      case window.data.statusDictionary.notFound:
        err = window.data.messages.http.err404;
        break;
      default:
        err = `${window.data.messages.http.status} ${xhr.status} ${xhr.statusText}`;
    }
    if (err) {
      onError(`${xhr.status} ${xhr.statusText}`);
    }
  });

  xhr.open(method, url);
  xhr.send(data);
};
window.http = http;

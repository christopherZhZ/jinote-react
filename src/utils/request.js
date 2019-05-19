import fetch from 'dva/fetch';
import { getUser } from '@/utils/authentication';

const _fetch = (fetch, timeout) => {
  return Promise.race([
    fetch,
    new Promise((resolve, reject) => {
      let error = new Error("504 Gateway Timeout");
      error.name = 504;
      setTimeout(() => reject(error), timeout);
    }),
  ]);
};

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default async function request(url, options) {

  const defaultOptions = {
    credentials: 'omit',
    timeout: 60*1000,
    headers: {
      userid: getUser() ? getUser().id : undefined,
    },
  };
  const opts = { ...defaultOptions, ...options };
  if (opts.method === 'POST' || opts.method === 'PUT') {
    if (!(opts.body instanceof FormData)) {
      opts.headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json; charset=utf-8',
        ...opts.headers,
      };
      opts.body = JSON.stringify(opts.body);
    } else {
      opts.headers = {
        Accept: 'application/json',
        ...opts.headers,
      };
    }
  }

  return _fetch(fetch(url, opts), opts.timeout)
        .then(checkStatus)
        .then(res => {
          if (res.status === 204) return res.text();
          return res.text().then(text => {
            return text
              ? JSON.parse(text)
              : {
                status: -1,
                errorMessage: 'server returns an empty response!',
              };
          });
        })
        .catch(e => {
          console.error(e);
        });
}

const axios = require('axios');

const url = 'http://192.168.0.20:3124/';

module.exports = {
  getCookie: function (key) {
    let cookies = document.cookie.split(';');

    for (let i = 0; i < cookies.length; i++) {
      cookies[i] = cookies[i].split('=');
      if (cookies[i][0].trim() === key) {
        return cookies[i][1];
      }
    }
  },
  _GET: async function (endpoint, param = '') {
    return await axios
      .get(url + endpoint + param, {
        headers: {
          Authorization: 'Bearer ' + this.getCookie('token'),
        },
      })
      .then((response) => {
        return response.data;
      })
      .catch((e) => {
        return e;
      });
  },
  _POST: async function (endpoint, param = {}) {
    return await axios
      .post(url + endpoint, param, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + this.getCookie('token'),
        },
      })
      .then((response) => {
        return response.data;
      })
      .catch((e) => {
        return e;
      });
  },
  _PUT: async function (endpoint, param = {}) {
    return await axios
      .put(url + endpoint, param, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + this.getCookie('token'),
        },
      })
      .then((response) => {
        return response.data;
      })
      .catch((e) => {
        return e;
      });
  },
  _DELETE: async function (endpoint, param = {}) {
    return await axios
      .delete(
        url + endpoint,
        { data: param },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + this.getCookie('token'),
          },
        }
      )
      .then((response) => {
        return response.data;
      })
      .catch((e) => {
        return e;
      });
  },
};

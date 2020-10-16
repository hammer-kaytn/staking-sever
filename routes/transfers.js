const app = require('express').Router();
const axios = require('axios');

// Use your KAS key pair
const accessKey = process.env.AKEY;
const secret = process.env.SKEY;
const ftAddr = process.env.FTADDR;
const chainId = 1001; // Baobab; for Cypress, use 8217

// Basic auth credential
const credential = Buffer.from(`${accessKey}:${secret}`).toString('base64');

// Make sure your are using TLS
const url = `https://th-api.klaytnapi.com/v2/transfer`;
const url2 = `https://th-api.klaytnapi.com/v2/transfer/account/`;

const headers = {
  Authorization: `Basic ${credential}`,
  'Content-Type': 'application/json',
  'x-chain-id': `${chainId}`,
};

// app.get('/', function (req, res) {
//   res.set({ 'access-control-allow-origin': '*' });
//   axios
//     .get(url, {
//       headers: headers,
//       params: {
//         kind: 'ft',
//         presets: '147',
//       },
//     })
//     .then(function (response) {
//       res.json(response['data']);
//     })
//     .then(function (err) {
//       if (err) {
//         console.error('error: ' + err);
//       }
//     })
//     .then(function () {
//       // finally
//     });
// });

app.get('/:address', function (req, res) {
  res.set({ 'access-control-allow-origin': '*' }); //api 서버랑 다를때 해결
  axios
    .get(url2 + req.params.address, {
      headers: headers,
      params: {
        kind: 'ft',
        presets: '147',
        'ca-filter': ftAddr,
      },
    })
    .then(function (response) {
      res.json(response['data']);
    })
    .then(function (err) {
      if (err) {
        console.error('error: ' + err);
      }
    })
    .then(function () {
      // finally
    });
});

module.exports = app;

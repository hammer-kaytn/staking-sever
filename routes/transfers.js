const app = require("express").Router();
const axios = require("axios");

// Use your KAS key pair
const accessKey = process.env.AKEY;
const secret = process.env.SKEY;
const ftAddr = process.env.FTADDR;
const chainId = 1001; // Baobab; for Cypress, use 8217

// Basic auth credential
const credential = Buffer.from(`${accessKey}:${secret}`).toString("base64");

// Make sure your are using TLS
const url = `https://th-api.beta.klaytn.io/v1/kct/ft/${ftAddr}/transfer`;

const headers = {
  Authorization: `Basic ${credential}`,
  "Content-Type": "application/json",
  "x-krn": `krn:${chainId}:th`,
};

app.get("/", function (req, res) {
  res.set({ "access-control-allow-origin": "*" }); //api 서버랑 다를때 해결
  axios
    .get(url, {
      headers: headers,
    })
    .then(function (response) {
      res.json(response["data"]);
    })
    .then(function (err) {
      if (err) {
        console.error("error: " + err);
      }
    })
    .then(function () {
      // finally
    });
});

app.get("/:address_id", function (req, res) {
  res.set({ "access-control-allow-origin": "*" }); //api 서버랑 다를때 해결
  axios
    .get(url, {
      headers: headers,
      params: {
        eoaAddress: req.params.address_id,
      },
    })
    .then(function (response) {
      res.json(response["data"]);
    })
    .then(function (err) {
      if (err) {
        console.error("error: " + err);
      }
    })
    .then(function () {
      // finally
    });
});

module.exports = app;

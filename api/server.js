const express = require('express');
const configureMiddleware = require('../config/middleware');

const server = express();
configureMiddleware(server);

server.get('/', (req, res) => {
  res.status(200).send('sanity check! GET request to /');
});

module.exports = server;

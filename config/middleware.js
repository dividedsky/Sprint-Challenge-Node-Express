const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

module.exports = server => {
  server.use(helmet());
  server.use(express.json());
  server.use(morgan('dev'));
  server.use(cors());
};

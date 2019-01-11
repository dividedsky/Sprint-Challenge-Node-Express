const express = require('express');
const configureMiddleware = require('../config/middleware');
const projectsRouter = require('../projects/projectsRouter');

const server = express();
configureMiddleware(server);

server.use('/projects', projectsRouter);

module.exports = server;

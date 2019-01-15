const express = require('express');
const configureMiddleware = require('../config/middleware');
const projectsRouter = require('../projects/projectsRouter');
const actionsRouter = require('../actions/actionsRouter');

const server = express();
configureMiddleware(server);

server.use('/projects', projectsRouter);
server.use('/actions', actionsRouter);

module.exports = server;

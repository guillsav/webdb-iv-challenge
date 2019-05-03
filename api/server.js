const express = require('express');
const server = express();
const dishesRouter = require('../dishes/dishes-router.js');
const recipesRouter = require('../recipes/recipes-router.js');

server.use(express.json());
server.use('/api/dishes', dishesRouter);
server.use('/api/recipes', recipesRouter);

module.exports = server;

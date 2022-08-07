// Create router using Express
const express = require('express');
const planetsRouter = express.Router();

// Fetch data from API ->
const { HttpGetAllPlanets } = require('./planets.controller');

planetsRouter.get('/planets', HttpGetAllPlanets);

module.exports = planetsRouter;

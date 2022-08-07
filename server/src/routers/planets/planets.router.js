// Create router using Express
const express = require('express');
const planetsRouter = express.Router();

// Fetch data from API ->
const { getAllPlanets } = require('./planets.controller');

planetsRouter.get('/planets', getAllPlanets);

module.exports = planetsRouter;

const express = require('express');
const launchesRouter = express.Router();

const {
    HttpGetAllLaunches,
    httpAddNewLaunch,
} = require('./launches.controller');

launchesRouter.get('/launches', HttpGetAllLaunches);
launchesRouter.post('/launches', httpAddNewLaunch);

module.exports = launchesRouter;

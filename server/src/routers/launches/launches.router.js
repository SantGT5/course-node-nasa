const express = require('express');
const launchesRouter = express.Router();

const {
    HttpGetAllLaunches,
    httpAddNewLaunch,
    httpAbortLaunch,
} = require('./launches.controller');

launchesRouter.get('/launches', HttpGetAllLaunches);
launchesRouter.post('/launches', httpAddNewLaunch);
launchesRouter.delete('/launches/:id', httpAbortLaunch);

module.exports = launchesRouter;

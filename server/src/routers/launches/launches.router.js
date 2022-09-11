const express = require('express');
const launchesRouter = express.Router();

const {
    HttpGetAllLaunches,
    httpAddNewLaunch,
    httpAbortLaunch,
} = require('./launches.controller');

launchesRouter.get('/', HttpGetAllLaunches);
launchesRouter.post('/', httpAddNewLaunch);
launchesRouter.delete('/:id', httpAbortLaunch);

module.exports = launchesRouter;

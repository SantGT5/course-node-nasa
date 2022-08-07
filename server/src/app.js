// Run Express
const express = require('express');
const app = express();

// Print all Data request from FrontEnd
const morgan = require('morgan');

const cors = require('cors');

const planetsRouter = require('./routers/planets/planets.router');
const launchesRouter = require('./routers/launches/launches.router');

app.use(
    cors({
        origin: 'http://localhost:3000',
    })
);

app.use(morgan('combined'));

// We know that your express server is going to take in Json data, so we can use the following express config
app.use(express.json());

app.use(planetsRouter);
app.use(launchesRouter);

module.exports = app;

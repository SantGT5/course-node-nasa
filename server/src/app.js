// Run Express
const express = require('express');
const app = express();
const api = require('./routers/api');

// Print all Data request from FrontEnd
const morgan = require('morgan');

const cors = require('cors');

app.use(
    cors({
        origin: 'http://localhost:3000',
    })
);

app.use(morgan('combined'));

// We know that your express server is going to take in Json data, so we can use the following express config
app.use(express.json());

app.use('/v1', api)

module.exports = app;

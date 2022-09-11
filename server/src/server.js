// HTTP server config
// Using HTTP we can use different response, for example WebSocket && HTTP response
const http = require('http');

// MongoDB
const { mongoConnect } = require('./services/mongo');

// Calling Express
const app = require('./app');

const { loadPlanetsData } = require('./models/planets.model');

const PORT = process.env.PORT || '8000';

// Using HTTP we can use different responses, for example WebSocket && HTTP response
const server = http.createServer(app);

// running our server
async function startServer() {
    // Mongo config && execution
    await mongoConnect();
    await loadPlanetsData();

    // Running server
    server.listen(PORT, () => {
        console.log(`Server running on PORT: ${PORT}`);
    });
}

startServer();

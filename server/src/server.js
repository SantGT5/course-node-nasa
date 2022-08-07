// HTTP server config
// Using HTTP we can use different response, for example WebSocket && HTTP response
const http = require('http');

// Express config
const app = require('./app');

const { loadPlanetsData } = require('./models/planets.model');

const PORT = process.env.PORT || '8000';
const server = http.createServer(app);

async function startServer() {
    await loadPlanetsData();

    // Running server
    server.listen(PORT, () => {
        console.log(`Server running on PORT: ${PORT}`);
    });
}

startServer();

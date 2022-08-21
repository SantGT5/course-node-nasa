// HTTP server config
// Using HTTP we can use different response, for example WebSocket && HTTP response
const http = require('http');

// Requiring mongoose
const mongoose = require('mongoose');

// Calling Express
const app = require('./app');

const { loadPlanetsData } = require('./models/planets.model');

const PORT = process.env.PORT || '8000';

const MONGO_URL =
    'mongodb+srv://nasa-api:SRHiCYwuQfjWYiRF@nasacluster.thcuetw.mongodb.net/nasa?retryWrites=true&w=majority';

// Using HTTP we can use different responses, for example WebSocket && HTTP response
const server = http.createServer(app);

// If connect has no error
// We specify "once" because server only needs to run one time
mongoose.connection.once('open', () => {
    console.log('MongoDB connection ready!');
});

// If Mongo connect has a error we console the error
// In this case we are using "on" because we never know an error will get trigger && could be trigged more then one
mongoose.connection.on('error', (err) => {
    console.error(err);
});

// running our server
async function startServer() {
    // Mongo config && execution
    await mongoose.connect(MONGO_URL);
    await loadPlanetsData();

    // Running server
    server.listen(PORT, () => {
        console.log(`Server running on PORT: ${PORT}`);
    });
}

startServer();

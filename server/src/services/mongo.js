const mongoose = require('mongoose');

const MONGO_URL =
    'mongodb+srv://nasa-api:SRHiCYwuQfjWYiRF@nasacluster.thcuetw.mongodb.net/nasa?retryWrites=true&w=majority';

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

async function mongoConnect() {
    await mongoose.connect(MONGO_URL);
}

async function mongoDisconnect() {
    await mongoose.disconnect();
}

module.exports = {
    mongoConnect,
    mongoDisconnect,
};

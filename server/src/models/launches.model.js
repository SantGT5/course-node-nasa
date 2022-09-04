const launchesDatabase = require('./launches.mongo');
const planets = require('./planets.mongo');

const DEFAULT_FLIGHT_NUMBER = 100;

const launches = new Map();

const launch = {
    flightNumber: 100,
    mission: 'Kepler Exploration X',
    rocket: 'Explorer IS1',
    launchDate: new Date('December 27, 2030'),
    target: 'Kepler-442 b',
    customer: ['ZTM, NASA'],
    upcoming: true,
    success: true,
};

saveLaunch(launch);

function existsLaunchWithId(launchId) {
    return launches.has(launchId);
}

async function getLatestFlightNumber() {
    try {
        const latestLaunch = await launchesDatabase
            .findOne()
            .sort('-flightNumber');

        if (!latestLaunch) {
            return DEFAULT_FLIGHT_NUMBER;
        }

        return latestLaunch.flightNumber;
    } catch (err) {
        console.error(err);
    }
}

async function getAllLaunches() {
    return await launchesDatabase.find({}, { _id: 0, __v: 0 });
}

async function saveLaunch(launch) {
    try {
        const planet = await planets.findOne({
            keplerName: launch.target,
        });

        if (!planet) {
            throw new Error('No matching planet found.');
        }
        await launchesDatabase.findOneAndUpdate(
            {
                flightNumber: launch.flightNumber,
            },
            launch,
            { upsert: true }
        );
    } catch (err) {
        console.error(err);
    }
}

async function scheduleNewLaunch(launch) {
    try {
        const newFlightNumber = (await getLatestFlightNumber()) + 1;

        const newLaunch = Object.assign(launch, {
            success: true,
            upcoming: true,
            customer: ['Zero to Mastery', 'Nasa'],
            flightNumber: newFlightNumber,
        });

        await saveLaunch(newLaunch);
    } catch (err) {
        console.error(err);
    }
}

function abortLaunchById(launchId) {
    const aborted = launches.get(launchId);

    aborted.upcoming = false;
    aborted.success = false;

    return aborted;
}

module.exports = {
    getAllLaunches,
    scheduleNewLaunch,
    existsLaunchWithId,
    abortLaunchById,
};

const { getAllLaunches, addNewLaunch } = require('../../models/launches.modal');

function HttpGetAllLaunches(req, res) {
    return res.status(200).json(getAllLaunches());
}

function httpAddNewLaunch(req, res) {
    const launch = req.body;

    if (
        !launch.mission.trim() ||
        !launch.rocket.trim() ||
        !launch.launchDate.trim() ||
        !launch.destination.trim()
    ) {
        res.status(400).json({
            error: 'Mission required launch property',
        });
        return;
    }

    launch.launchDate = new Date(launch.launchDate);
    if (isNaN(launch.launchDate)) {
        return res.status(400).json({ error: 'Invalid launch date.' });
    }

    addNewLaunch(launch);

    res.status(201).json(launch);
    return;
}

module.exports = {
    HttpGetAllLaunches,
    httpAddNewLaunch,
};

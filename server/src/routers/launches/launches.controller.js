const { getAllLaunches, addNewLaunch } = require('../../models/launches.modal');

function HttpGetAllLaunches(req, res) {
    return res.status(200).json(getAllLaunches());
}

function httpAddNewLaunch(req, res) {
    const launch = req.body;
    launch.launchDate = new Date(launch.launchDate);

    addNewLaunch(launch);

    res.status(201).json(launch);
    return;
}

module.exports = {
    HttpGetAllLaunches,
    httpAddNewLaunch,
};

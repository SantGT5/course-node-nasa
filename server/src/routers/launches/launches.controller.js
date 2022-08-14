const {
    getAllLaunches,
    addNewLaunch,
    existsLaunchWithId,
    abortLaunchById,
} = require('../../models/launches.modal');

function HttpGetAllLaunches(req, res) {
    return res.status(200).json(getAllLaunches());
}

function httpAddNewLaunch(req, res) {
    const launch = req.body;

    if (
        !launch.mission ||
        !launch.rocket ||
        !launch.launchDate ||
        !launch.target
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

function httpAbortLaunch(req, res) {
    const { id } = req.params;
    
    if (!existsLaunchWithId(Number(id))) {
        return res.status(404).json({
            error: 'Launch not found',
        });
    }

    const aborted = abortLaunchById(Number(id));
    return res.status(200).json(aborted);
}

module.exports = {
    HttpGetAllLaunches,
    httpAddNewLaunch,
    httpAbortLaunch,
};

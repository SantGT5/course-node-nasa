const {
    getAllLaunches,
    scheduleNewLaunch,
    existsLaunchWithId,
    abortLaunchById,
} = require('../../models/launches.model');

async function HttpGetAllLaunches(req, res) {
    return res.status(200).json(await getAllLaunches());
}

async function httpAddNewLaunch(req, res) {
    const launch = req.body;

    if (
        !launch.mission ||
        !launch.rocket ||
        !launch.launchDate ||
        !launch.target
    ) {
        res.status(400).json({
            error: 'Missing required launch property',
        });
        return;
    }

    launch.launchDate = new Date(launch.launchDate);
    if (isNaN(launch.launchDate)) {
        return res.status(400).json({ error: 'Invalid launch date.' });
    }

    await scheduleNewLaunch(launch);

    res.status(201).json(launch);
    return;
}

async function httpAbortLaunch(req, res) {
    const { id } = req.params;

    const existLaunch = await existsLaunchWithId(id);

    if (!existLaunch) {
        return res.status(404).json({
            error: 'Launch not found',
        });
    }

    const aborted = await abortLaunchById(Number(id));

    if (!aborted) {
        return res.status(400).json({ error: 'Launch not aborted.' });
    }

    return res.status(200).json({ ok: true });
}

module.exports = {
    HttpGetAllLaunches,
    httpAddNewLaunch,
    httpAbortLaunch,
};

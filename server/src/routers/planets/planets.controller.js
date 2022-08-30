const { getAllPlanets } = require('../../models/planets.model');

async function HttpGetAllPlanets(req, res) {
    res.status(200).json(await getAllPlanets());
    return;
}

module.exports = { HttpGetAllPlanets };

const { getAllPlanets } = require('../../models/planets.model');

function HttpGetAllPlanets(req, res) {
    res.status(200).json(getAllPlanets());
    return;
}

module.exports = { HttpGetAllPlanets };

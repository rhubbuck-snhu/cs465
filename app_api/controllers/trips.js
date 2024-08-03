const mongoose = require('mongoose');
const Trip = require('../models/travlr');
const Model = mongoose.model('trips');

//GET: /trips - list all trips
//regarless of outcome, reponse must include HTML status code
// and JSON message to the requesting client
const tripsList = async(req, res) => {
    const q = await Model
    .find({})
    .exec();

    if (!q) { // if db returned no data
        return res
        .status(404)
        .json(err);
    } else {
        return res
        .status(200)
        .json(q);
    }
};

//GET: /trips/:tripCode - list a single trip
const tripsFindByCode = async(req, res) => {
    const q = await Model
    .find({ 'code' : req.params.tripCode })
    .exec();

    if (!q) { // if db returned no data
        return res
        .status(404)
        .json(err);
    } else {
        return res
        .status(200)
        .json(q);
    }
};

module.exports = {
    tripsList,
    tripsFindByCode
};
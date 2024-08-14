const mongoose = require('mongoose');
// const Trip = require('../models/travlr');
// const Model = mongoose.model('trips');
const Trip = require('../models/travlr');
const User = require('../models/user');

//GET: /trips - list all trips
//regarless of outcome, reponse must include HTML status code
// and JSON message to the requesting client
// const tripsList = async(req, res) => {
//     const q = await Model
//     .find({})
//     .exec();

//     if (!q) { // if db returned no data
//         return res
//         .status(404)
//         .json(err);
//     } else {
//         return res
//         .status(200)
//         .json(q);
//     }
// };
const tripsList = async (req, res) => {
    Trip
        .find({})  // no parameter in find query returns all trips
        .exec((err, trips) => {
            // if no trips found, return error message
            if (!trips) {
                return res
                    .status(404)
                    .json({ "message": "Trip not found" });
            // else if error occurred in mongoose, return the error
            } else if (err) {
                return res
                    .status(404)
                    .json(err);
            // else the trips were found, so return OK code and trips
            } else {
                return res
                    .status(200)
                    .json(trips);
            }
        })
};

//GET: /trips/:tripCode - list a single trip
// const tripsFindByCode = async(req, res) => {
//     const q = await Model
//     .find({ 'code' : req.params.tripCode })
//     .exec();

//     if (!q) { // if db returned no data
//         return res
//         .status(404)
//         .json(err);
//     } else {
//         return res
//         .status(200)
//         .json(q);
//     }
// };
const tripsFindByCode = async (req, res) => {
    Trip
        .find({ 'code': req.params.tripCode })
        .exec((err, trip) => {
            if (!trip) {
                return res
                    .status(404)
                    .json({ "message": "Trip not found" });
            } else if (err) {
                return res
                    .status(404)
                    .json(err);
            } else {
                return res
                    .status(200)
                    .json(trip)
            }
        });
};

//POST: /trips - adds a new trip
// const tripsAddTrip = async(req, res) => {
//     const newTrip = new Trip({
//         code: req.body.code,
//         name: req.body.name,
//         length: req.body.length,
//         start: req.body.start,
//         resort: req.body.resort,
//         perPerson: req.body.perPerson,
//         image: req.body.image,
//         description: req.body.description
//     });

//     const q = await newTrip.save();

//     if(!q) {
//         return res
//         .status(400)
//         .json(err);
//     } else {
//         return res
//         .status(201)
//         .json(q);
//     }
// };
const tripsAddTrip = async (req, res) => {
    getUser(req,res,
        (req, res) => {
        Trip
            .create({
                code: req.body.code,
                name: req.body.name,
                length: req.body.length,
                start: req.body.start,
                resort: req.body.resort,
                perPerson: req.body.perPerson,
                image: req.body.image,
                description: req.body.description
            },
            (err, trip) => {
                if (err) {
                    return res
                        .status(400)  // bad request, invalid content
                        .json(err);
                } else {
                    return res
                        .status(201) // created
                        .json(trip);
                }
            })
        }
    )
};

// PUT: /trips/:tripCode - Adds a new Trip
// Regardless of outcome, response must include HTML status code
// and JSON message to the requesting client
// const tripsUpdateTrip = async(req, res) => {
//     const q = await Model
//     .findOneAndUpdate(
//     { 'code' : req.params.tripCode },
//     {
//     code: req.body.code,
//     name: req.body.name,
//     length: req.body.length,
//     start: req.body.start,
//     resort: req.body.resort,
//     perPerson: req.body.perPerson,
//     image: req.body.image,
//     description: req.body.description
//     })
//     .exec();
//     if(!q) { // Database returned no data
//         return res
//         .status(400)
//         .json(err);
//     } else { // Return resulting updated trip
//         return res
//         .status(201)
//         .json(q);
//     }
//     // Uncomment the following line to show results of
//     operation
//     // on the console
//     // console.log(q);
// };
const tripsUpdateTrip = async (req, res) => {
    getUser(req,res,
        (req, res) => {
        console.log(req.body);
        Trip
            .findOneAndUpdate({ 'code': req.params.tripCode }, {
                code: req.body.code,
                name: req.body.name,
                length: req.body.length,
                start: req.body.start,
                resort: req.body.resort,
                perPerson: req.body.perPerson,
                image: req.body.image,
                description: req.body.description
            }, { new: true })
            .then(trip => {
                if (!trip) {
                    return res
                        .status(404)
                        .send({
                            message: "Trip not found with code " + req.params.tripCode
                    });
                }
                res.send(trip);
            }).catch(err => {
                if (err.kind === 'ObjectId') {
                    return res
                        .status(404)
                        .send({
                            message: "Trip not found with code " + req.params.tripCode
                        });
                }
                return res
                    .status(500) // server error
                    .json(err);
            });
        }
    )
};

const getUser = (req, res, callback) => {
    if (req.payload && req.payload.email) {
        User
            .findOne({ email: req.payload.email })
            .exec((err, user) => {
                if (!user) {
                    return res
                        .status(404)
                        .json({ "message": "User not found" });
                } else if (err) {
                    console.log(err);
                    return res
                        .status(404)
                        .json(err);
                }
                callback(req,res,user.name);
            });
        } else {
            return res
                .status(404)
                .json({ "message": "User not found" });
        
    }
};

module.exports = {
    tripsList,
    tripsFindByCode,
    tripsAddTrip,
    tripsUpdateTrip
};
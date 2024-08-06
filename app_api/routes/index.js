const express = require('express');
const router = express.Router();

const tripsController = require('../controllers/trips');

router 
.route('/trips')
.get(tripsController.tripsList) // GET method routes tripList
.post(tripsController.tripsAddTrip); // POST Method adds a trip

router
.route('/trips/:tripCode')
.get(tripsController.tripsFindByCode) // GET method routes tripsFindByCode
.put(tripsController.tripsUpdateTrip); // Update method

module.exports = router;
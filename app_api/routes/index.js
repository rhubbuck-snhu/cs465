const express = require('express');
const router = express.Router();

const tripsController = require('../controllers/trips');

router 
.route('/trips')
.get(tripsController.tripsList); // GET method routes tripList

router
.route('/trips/:tripCode')
.get(tripsController.tripsFindByCode); // GET method routes tripsFindByCode

module.exports = router;
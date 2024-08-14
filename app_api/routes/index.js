const express = require('express');
const router = express.Router();
// const {expressjwt: jwt} = require('express-jwt');
const jwt = require('jsonwebtoken'); // Enable JSON Web Tokens
const jwtt = require('express-jwt');
const auth = jwtt({
    secret: process.env.JWT_SECRET,
    userProperty: 'payload',
    algorithms: ["HS256"],
  });

// Method to authenticate our JWT
function authenticateJWT(req, res, next) {
    // console.log('In Middleware');
    const authHeader = req.headers['authorization'];
    // console.log('Auth Header: ' + authHeader);
    if(authHeader == null)
    {
        console.log('Auth Header Required but NOT PRESENT!');
        return res.sendStatus(401);
    }
    let headers = authHeader.split(' ');
    if(headers.length < 1)
    {
        console.log('Not enough tokens in Auth Header: ' + headers.length);
        return res.sendStatus(501);
    }
    const token = authHeader.split(' ')[1];
    // console.log('Token: ' + token);
    if(token == null)
    {
        console.log('Null Bearer Token');
        return res.sendStatus(401);
    }
    // console.log(process.env.JWT_SECRET);
    // console.log(jwt.decode(token));
    const verified = jwt.verify(token, process.env.JWT_SECRET, (err, verified) => {
        if(err)
        {
            return res.sendStatus(401).json('Token Validation Error!');
        }
        req.auth = verified; // Set the auth paramto the decoded object
    });
    next(); // We need to continue or this will hang forever
};
    

const authController = require('../controllers/authentication');
const tripsController = require('../controllers/trips');
  
// define route for registration endpoint
router
.route('/register')
.post(authController.register);
 
//define the route for login endpoint
router
.route('/login')
.post(authController.login);

router 
.route('/trips')
.get(tripsController.tripsList) // GET method routes tripList
.post(auth, tripsController.tripsAddTrip); // POST Method adds a trip

router
.route('/trips/:tripCode')
.get(tripsController.tripsFindByCode) // GET method routes tripsFindByCode
.put(auth, tripsController.tripsUpdateTrip); // Update method

module.exports = router;
/*
 * Api.js
 * @description
 * This file is used for storing all the routes related to the project.
 */
const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
const eventController = require('../controllers/eventController');
const shiftController = require('../controllers/shiftController');
const User = require('../models/UserModels');


router.get('/ping', userController.sayHello)
router.get('/fetchDataFromApi', userController.fetchDataFromApi);

router.post('/register', userController.register);
router.post('/login', userController.login);

// Shift Api's
router.post('/shiftStart', shiftController.startShift);
router.post('/payout', shiftController.payout);
router.post('/priceChange', shiftController.priceChange);
router.get('/fetchPrice', shiftController.fetchPrice);
router.post('/endShift', shiftController.endShift);
router.get('/shiftListing', shiftController.shiftListing);


//Admin Api's
router.get('/userListing', userController.fetchAllUsers);
router.get('./getTotalLitresSale', shiftcontroller.totallitresSale)


module.exports = router;
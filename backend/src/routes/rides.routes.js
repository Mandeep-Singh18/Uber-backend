import express from 'express';
import { body, query } from 'express-validator';
import { authUser, authCaptain } from '../middlewares/auth.middleware.js';
import { createRide, getFare, confirmRide, startRide, endRide } from '../controllers/rides.controllers.js';

const router = express.Router();

router.post('/create', authUser, [
    body('pickup').notEmpty().withMessage('Pickup address is required'),    
    body('destination').notEmpty().withMessage('Dropoff address is required'),
    body('vehicleType').isString().isIn([ 'auto', 'car', 'bike' ]).withMessage('Vehicle type must be a string'),
], createRide);

router.get('/get-fare', authUser, [
    query('pickup').notEmpty().withMessage('Pickup address is required'),
    query('destination').notEmpty().withMessage('Dropoff address is required'),
], getFare);

router.post('/confirm', authCaptain, body('rideId').isMongoId().notEmpty().withMessage('Ride ID is required'), confirmRide);

router.get('/start-ride', authCaptain, query('rideId').isMongoId().notEmpty().withMessage('Ride ID is required'), query('otp').isString().isLength({ min: 6, max: 6 }).withMessage('Invalid OTP'), startRide);   

router.post('/end-ride', authCaptain, body('rideId').isMongoId().notEmpty().withMessage('Ride ID is required'), endRide);

export default router;
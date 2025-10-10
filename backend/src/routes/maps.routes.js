import express from 'express';
import { authUser } from '../middlewares/auth.middleware.js';
import { query } from 'express-validator';
import { getCoordinates, getDistanceAndTime, getSuggestions } from '../controllers/maps.controller.js';

const router = express.Router();

router.get('/get-coordinates', query('address').isString().isLength({min: 3}), authUser, getCoordinates);

router.get('/get-distance-time', query('origin').isString().isLength({min: 3}), query('destination').isString().isLength({min: 3}), authUser, getDistanceAndTime);

router.get('/get-suggestions', query('input').isString().isLength({min: 1}), authUser, getSuggestions);

export default router;
import { validationResult } from "express-validator";
import { getAdressCoordinate, getAutoCompleteSuggestions, getCaptainInRadius, getDistanceTime } from "../services/maps.service.js"; 
import rideModel from "../models/ride.model.js";
import { confirmRideService, createRideService, endRideService, getFareService, startRideService } from "../services/rides.service.js";
import { sendMessageToSocketId } from "../socket.js";

export const createRide = async (req, res) => {
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()})
        }

        const { pickup, destination, vehicleType } = req.body;
        const userId = req.user.id;

        const ride = await createRideService({
            user: req.user._id,
            pickup,
            destination,
            vehicleType,
        });

        res.status(201).json(ride);

        const pickupcoords = await getAdressCoordinate(pickup);
        const captainInRadius = await getCaptainInRadius(pickupcoords.ltd, pickupcoords.lng, 2);

        ride.otp = "";
        const rideWithUser = await rideModel.findOne({_id: ride._id}).populate('user', '-password -role -isVerified -createdAt -updatedAt -__v');
        captainInRadius.map(captain => {
            sendMessageToSocketId(captain.socketId, {   
                event: 'newRide',
                data: rideWithUser
            })
        });

    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

export const getFare = async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()})
    }

    const { pickup, destination } = req.body;  

    try {
        const fare = await getFareService(pickup, destination);
        res.status(200).json( fare );
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

export const confirmRide = async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()})
    }

    const { rideId } = req.body;

    try {
        const ride = await confirmRideService(rideId, req.captain);
        sendMessageToSocketId(ride.user.socketId, {   
            event: 'newRide',
            data: ride
        })
        return res.status(200).json(ride);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

export const startRide = async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()})
    }

    const { rideId, otp } = req.body;

    try {
        const ride = await startRideService(rideId, otp, req.captain);
        sendMessageToSocketId(ride.user.socketId, {   
            event: 'ride-started',
            data: ride
        })
        return res.status(200).json(ride);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

export const endRide = async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()})
    }

    const { rideId } = req.body;

    try {
        const ride = await endRideService(rideId, req.captain);
        sendMessageToSocketId(ride.user.socketId, {   
            event: 'ride-ended',
            data: ride
        })
        return res.status(200).json(ride);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}
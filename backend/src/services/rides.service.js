import rideModel from '../models/ride.model.js';
import { getAdressCoordinate, getDistanceTime, getAutoCompleteSuggestions, getCaptainInRadius } from './maps.service.js';
import crypto from 'crypto';

export const getFareService = async (pickup, destination) => {
    if(!pickup || !destination) {
        throw new Error("Pickup and destination are required");
    }

    const distanceTime = await getDistanceTime(pickup, destination);

    const baseFare = {
        auto: 30,
        bike: 20,
        car: 50
    }
    const perKmRate = {
        auto: 10,
        bike: 8,
        car: 15
    } 

    const fare = {
        auto: Math.round(baseFare.auto + (perKmRate.auto * parseFloat(distanceTime.distance))),
        bike: Math.round(baseFare.bike + (perKmRate.bike * parseFloat(distanceTime.distance))),
        car: Math.round(baseFare.car + (perKmRate.car * parseFloat(distanceTime.distance))),
    }

    return fare;
}

const getOtp = async (num) => { 
    function generateOtp(num) {
        const otp = crypto.randomInt(0, 10).toString();
        return otp;
    }
    return generateOtp(num);
}

export const createRideService = async (user, pickup, destination, vehicleType) => {
    const fare = await getFareService(pickup, destination);

    const ride = await rideModel.create({
        user,
        pickup,
        destination,
        vehicleType,
        fare: fare[vehicleType],
        otp: getOtp(6)
    });

    return ride;
}

export const confirmRideService = async (rideId, captainId) => {
    await rideModel.findOneAndUpdate({
        _id: rideId,
    }, {
        status: 'accepted',
        captain: captainId
    })

    const ride = await rideModel.findOne({_id: rideId}).populate('user', '-password -role -isVerified -createdAt -updatedAt -__v').populate('captain', '-password -role -isVerified -createdAt -updatedAt -__v').select('+otp');

    return ride;
}

export const startRideService = async (rideId, otp, captain) => {
    const ride = await rideModel.findOne({_id: rideId}).populate('user', '-password -role -isVerified -createdAt -updatedAt -__v').populate('captain', '-password -role -isVerified -createdAt -updatedAt -__v').select('+otp');

    if(ride.otp !== otp) {
        throw new Error("Invalid OTP");
    }

    if(!ride.status === 'accepted') {
        throw new Error("Ride not accepted yet");
    }

    await rideModel.findOneAndUpdate({
        _id: rideId,
    }, {
        status: 'ongoing',
    })

    return ride;
}

export const endRideService = async (rideId, captain) => {
    const ride = await rideModel.findOne({_id: rideId}).populate('user', '-password -role -isVerified -createdAt -updatedAt -__v').populate('captain', '-password -role -isVerified -createdAt -updatedAt -__v').select('+otp');

    if(!ride) {
        throw new Error("Ride not found");
    }

    if(!ride.status === 'ongoing') {
        throw new Error("Ride not started yet");
    }

    await rideModel.findOneAndUpdate({
        _id: rideId,
    }, {
        status: 'completed',
    })

    return ride;
} 
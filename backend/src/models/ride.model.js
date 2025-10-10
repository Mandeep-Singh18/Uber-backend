import mongoose from "mongoose";

const rideSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    captain: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Captain'
    },
    pickup: {
        type: String,
        required: true,
    },
    destination: {
        type: String,
        required: true,
    },
    fare: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: ['pending', 'ongoing', 'completed', 'cancelled', 'accepted'],
        default: 'pending'
    },
    duration: {
        type: Number,
    }, // seconds
    distance: {
        type: Number,
    }, // meters
    paymentId: {
        type: String,
    },
    orderId: {
        type: String,
    },
    signature: {
        type: String,
    },
    otp: {
        type: String,
        select: false,
        required: true
    }
}, { timestamps: true });

const rideModel = mongoose.model("Ride", rideSchema);
export default rideModel;
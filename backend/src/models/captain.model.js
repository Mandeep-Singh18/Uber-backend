import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { act } from "react";

const captainSchema = new mongoose.Schema({
    fullName: {
        firstName:  {
            type: String,
            required: true,
            minLength: [3, "Firstname should be more than 3 characters"]
        },
        lastName: {
            type: String,
            minLength: [3, "Lastname should be more than 3 characters"]
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        minLength: [5, "email should be more than 5 characters"]
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    socketId: {
        type: String
    },
    status: {
        type: String,
        enum: [ 'active', 'inactive' ],
        default: 'inactive'
    },
    vehicles: {
        color: {
            type: String,
            required: true,
            minLength: [3, "color should be more than 3 characters"]
        },
        plate: {
            type: String,
            required: true,
            minLength: [3, "plate should be more than 3 characters"]
        },
        capacity: {
            type: Number,
            required: true,
            min: [1, "capacity should be at least 1"]
        },
        vehicleType: {
            type: String,
            required: true,
            enum: ['bike', 'car', 'auto']
        }
    },
    location: {
        ltd: {
            type: Number,
        },
        lng: {
            type: Number,
        }
    }
})


captainSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({_id: this._id}, process.env.JWT_SECRET, {expiresIn: "24h"});
    return token;
}

captainSchema.methods.comparePassword = async function(enteredpass) {
    return await bcrypt.compare(enteredpass, this.password);
}

captainSchema.statics.hashPassword = async function(password) {
    return await bcrypt.hash(password, 10);
}


const captainModel = mongoose.model("Captain", captainSchema);
export default captainModel;
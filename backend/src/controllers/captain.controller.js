import { validationResult } from "express-validator";
import captainModel from "../models/captain.model.js";
import { createCaptain } from "../services/captain.service.js";

export const registerCaptain = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { fullName, email, password, vehicles } = req.body;

        const existingCaptain = await captainModel.findOne({ email });
        if (existingCaptain) {
            return res.status(400).json({ message: "Captain is already exists" });
        }

        const hashedPassword = await captainModel.hashPassword(password);
        const newCaptain = await new createCaptain({
            firstName: fullName.firstName,
            lastName: fullName.lastName,
            email,
            password: hashedPassword,
            color: vehicles.color,
            plate: vehicles.plate,
            capacity: vehicles.capacity,
            vehicleType: vehicles.vehicleType
        });
        
        const token = newCaptain.generateAuthToken();
        res.status(201).json({ token, newCaptain });

    } catch (error) {
        return res.status(500).json({ message: "Server Error" });
    }
}

export const loginCaptain = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;
        const captain = await captainModel.findOne({ email }).select("+password");
        if (!captain) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        const isPasswordMatched = await captain.comparePassword(password);
        if (!isPasswordMatched) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        const token = await captain.generateAuthToken();
        res.cookie("token", token);
        res.status(200).json({ token, captain });

    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
}

export const getCaptainProfile = async (req, res) => {
    res.status(200).json({ captain: req.captain }); 
} 

export const logoutCaptain = async (req, res) => {
    res.clearCookie("token");
    res.status(200).json({ message: "Captain logged out successfully" });
}
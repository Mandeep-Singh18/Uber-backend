import { validationResult } from "express-validator"
import userModel from "../models/user.model.js"
import { createUser } from "../services/user.services.js";

export const userRegister = async (req, res) => {
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()})
        }
        
        const { fullName, email, password } = req.body;
        
        const isUserAlreayExists = await userModel.findOne({email});
        if(isUserAlreayExists){
            return res.status(400).json({message: "User already exists"});
        }

        const hashedPassword = await userModel.hashPassword(password);
        
        const User = await createUser({
            firstName: fullName.firstName,
            lastName: fullName.lastName,
            email,
            password: hashedPassword
        })

        const token = await User.generateAuthToken();
        res.status(201).json({User, token});

    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

export const userLogin = async (req, res) => {
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()})
        }
    
        const { email, password } = req.body;
    
        const user = await userModel.findOne({email}).select("+password");
        if(!user) {
            return res.status(400).json({message: "Invalid email or password"});
        }
    
        const isPasswordMatched = await user.comparePassword(password);
        if(!isPasswordMatched) {
            return res.status(400).json({message: "Invalid email or password"});
        }
    
        const token = await user.generateAuthToken();
        res.cookie("token", token);
        res.status(200).json({user, token});
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}


export const userProfile = async (req, res) => {
    res.status(200).json(req.user);
}

export const userLogout = async (req, res) => {
    res.clearCookie("token");
    res.status(200).json({message: "Logged out successfully"});
}
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
export const userLogin = (req, res) => {

}
export const userProfile = (req, res) => {

}
export const userLogout = (req, res) => {

}
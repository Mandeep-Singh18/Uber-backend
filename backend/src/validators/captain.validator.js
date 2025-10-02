import { body } from "express-validator";

export const registerValidator = [
    body("email").isEmail().withMessage("Invalid email"),
    body("fullName.firstName").isLength({min: 3}).withMessage("FirstName Should be 3 chracters long"),
    body("password").isLength({min: 6}).withMessage("Password should be 6 characters long"),
    body("vehicles.color").isLength({min: 3}).withMessage("Color Should be 3 chracters long"),
    body("vehicles.plate").isLength({min: 3}).withMessage("Plate Should be 3 chracters long"),
    body("vehicles.capacity").isInt({min: 1}).withMessage("Capacity should be at least 1"),
    body("vehicles.vehicleType").isIn(['bike', 'car', 'auto']).withMessage("Vehicle type must be bike, car or auto")
];

export const loginValidator = [
    body("email").isEmail().withMessage("Invalid email"),
    body("password").isLength({min: 6}).withMessage("Password should be 6 characters long"),
]
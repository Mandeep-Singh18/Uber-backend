import { body } from "express-validator";

export const registerValidator = [
    body("email").isEmail().withMessage("Invalid email"),
    body("fullName.firstName").isLength({min: 3}).withMessage("FirstName Should be 3 chracters long"),
    body("password").isLength({min: 6}).withMessage("Password should be 6 characters long")
];

export const loginValidator = [
    body("email").isEmail().withMessage("Invalid email"),
    body("password").isLength({min: 6}).withMessage("Password should be 6 characters long")
]
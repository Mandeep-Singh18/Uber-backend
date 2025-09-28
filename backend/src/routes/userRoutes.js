import express from "express";
import { registerValidator } from "../validators/user.validator.js";
import { userLogin, userLogout, userProfile, userRegister } from "../controllers/user.controllers.js";

const router = express.Router();

router.post('/register', registerValidator, userRegister)

router.post('/login', userLogin)
router.get('/profile', userProfile)
router.get('/logout', userLogout)

export default router;
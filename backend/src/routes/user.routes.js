import express from "express";
import { loginValidator, registerValidator } from "../validators/user.validator.js";
import { userLogin, userLogout, userProfile, userRegister } from "../controllers/user.controllers.js";
import { authUser } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post('/register', registerValidator, userRegister)
router.post('/login', loginValidator, userLogin)
router.get('/profile', authUser, userProfile)
router.get('/logout', authUser, userLogout)

export default router;
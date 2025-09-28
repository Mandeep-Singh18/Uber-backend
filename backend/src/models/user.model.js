import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
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
        minLength: [5, "email should be more than 5 characters"]
    },
    password: {
        type: String,
        required: true,
        select: true
    },
    socketId: {
        type: String
    }
})

userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({_id: this._id}, process.env.JWT_SECRET, {expiresIn: "24h"});
    return token;
}

userSchema.methods.comparePassword = async function(enteredpass) {
    return await bcrypt.compare(enteredpass, this.password);
}

userSchema.statics.hashPassword = async function(password) {
    return await bcrypt.hash(password, 10);
}

const userModel = mongoose.model("User", userSchema);
export default userModel;
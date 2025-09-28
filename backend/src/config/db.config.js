import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config();

export const connectDB = async() => {
    try {
        const connect = await mongoose.connect(process.env.MONGODB_URL);
        console.log(`db is connected on: ${connect.connection.host}`);
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
}
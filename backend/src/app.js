import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser"

import userRoutes from "./routes/userRoutes.js"
import { connectDB } from "./config/db.config.js";

const app = express();
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());

app.use('/api/v1/users', userRoutes);

// app.get('/', (req, res) => {
//     res.send("Server is Running")
// })

export default app
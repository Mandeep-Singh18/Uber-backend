import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser"

import userRoutes from "./routes/user.routes.js"
import captainRoutes from "./routes/captain.routes.js"
import mapsRoutes from "./routes/maps.routes.js"
import { connectDB } from "./config/db.config.js";

const app = express();
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());

app.use('/api/v1/users', userRoutes);
app.use('/api/v1/captain', captainRoutes);
app.use('/api/v1/maps', mapsRoutes);

// app.get('/', (req, res) => {
//     res.send("Server is Running")
// })

export default app
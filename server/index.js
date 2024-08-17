import express from 'express';
import connectDB from "./config/db.js";
import userRoutes from './routes/user.route.js';
import authRoutes from "./routes/auth.routes.js";
import dotenv from "dotenv";
dotenv.config();
const PORT = process.env.PORT || 8000;

import path from "path";
const app = express();
// to can use json when front-end send request  json
app.use(express.json())
// Connect Database
connectDB();

//run my back-end server
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

//middleware
app.use("/api/user", userRoutes); 
app.use("/api/auth", authRoutes);

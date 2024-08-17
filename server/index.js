import express from 'express';
import connectDB from "./config/db.js";
import userRoutes from './routes/user.route.js';
import authRoutes from "./routes/auth.routes.js";
import dotenv from "dotenv";
dotenv.config();
const PORT = process.env.PORT || 8000;

import path from "path";
const app = express();
// to can use json when front-end send request json
app.use(express.json());

// Connect Database
connectDB();

//run my back-end server
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

//routes and middleware
app.use("/api/user", userRoutes); 
app.use("/api/auth", authRoutes);

//middleware to make error is butter
app.use((err, req, res, next) => {
    //error must have status code if not have include 500
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

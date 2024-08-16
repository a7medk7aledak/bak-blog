import express from 'express';
import connectDB from "./config/db.js";
import mongoose from 'mongoose'
import dotenv from "dotenv";
dotenv.config();
const PORT = process.env.PORT || 8000;

import path from "path";
const app = express();
// Connect Database
connectDB();

//run my back-end server
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

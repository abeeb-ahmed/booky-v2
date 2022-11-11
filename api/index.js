import express from "express";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import authRouter from "./routes/auth.js";
import hotelsRouter from "./routes/hotels.js";
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();

const connect = async () => {
  try {
    mongoose.connect(process.env.MONGO);
    console.log("Connected to db");
  } catch (error) {
    console.log(error);
  }
};
const port = 8800;

mongoose.connection.on("disconnected", () => {
  console.log("db disconnected");
});

// middleware
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/hotels", hotelsRouter);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

app.listen(port, () => {
  connect();
  console.log(`connection to backend on port ${port}`);
});

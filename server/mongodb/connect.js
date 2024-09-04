import mongoose from "mongoose";
import dotenv from "dotenv";
import PORT from "../index.js";
dotenv.config();
const connectDB = (uri) => {
  mongoose
    .connect(uri)
    .then(() => console.log("MongoDB is Connected"))
    .then(() => console.log(`Server is running on port ${PORT}`))
    .catch((err) => console.log(err));
};
export default connectDB;

import mongoose from "mongoose";
require("dotenv").config();
const connection = mongoose.connect(process.env.MONGODB_URL as any);
export default connection;

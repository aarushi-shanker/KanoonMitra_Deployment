import mongoose from "mongoose";
import logEvent from "../utils/logEvents.js";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
    } catch (error) {
        await logEvent("ERROR", "DB", {
        message: `Database connection failed. Error : ${error.message}`,
    });
    }
};

export default connectDB
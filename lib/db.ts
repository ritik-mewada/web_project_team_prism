import mongoose from "mongoose";

const MONGODB_URI: string = process.env.MONGO_DB!;

const connectToDatabase = async () => {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log("MongoDB connected");
    } catch (error) {
        console.error("MongoDB connection error:", error);
        process.exit(1);
    }
};

export default connectToDatabase;

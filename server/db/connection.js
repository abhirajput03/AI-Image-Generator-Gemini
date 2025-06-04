import mongoose from "mongoose";

const connectDB = async (url) => {
    await mongoose.connect(url).then(() => {
        console.log("Database connected!");
    }).catch((err) => {
        console.log("connection failed!", err);
    })
}

export default connectDB;
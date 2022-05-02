import mongoose from "mongoose";

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            
        });
        console.log("Connected to databse...");
    } catch (err) {
        console.log(err);
        process.exit();
    }
};
export default connectDb;

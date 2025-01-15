import mongoose from "mongoose";

const connectDb = async () => {
    try{

        await mongoose.connect(process.env.MONGO_URI)
        console.log("Successfully connected to mongodb");

    } catch(err){
        console.error(`Error: ${err.message}`)
        process.exit(1);
    }
}

export default connectDb;
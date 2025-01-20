import mongoose from "mongoose"

export const connectDB = async() =>{
    try{
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`Connect to MongoDB ${conn.connection.host}`);
    }catch(err){
        console.log(`Failed to connect to the MongoDB`, err);
        process.exit(1); //1 is failure
    }
}
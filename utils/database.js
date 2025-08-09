import mongoose from 'mongoose';

let isConected = false

export const connectToDatabase = async () => {

    mongoose.set('strictQuery', true);
    if(isConected) {
        console.log("mongoose is already connected")
        return;
    }

    try{
        await mongoose.connect('mongodb://localhost:27017/mydatabase')

        isConected = true;
        console.log("MongoDB connected");
    }
    catch(error) {
        console.log("MongoDB connection error:", error);
        isConected = false; 
    }
}
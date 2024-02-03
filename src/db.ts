import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

export const  connectionDB = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/');
        console.log('Connected to MongoDB');
        
    } catch (error) {
        console.log(error);
        
    }
}
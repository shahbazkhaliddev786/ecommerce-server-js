import mongoose from "mongoose";

const connectDB = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL, {
            dbName: "ecommerce-app"
        })
        console.log("Connected to db")
    } catch (error) {
        console.log(error)
    }
}

export default connectDB
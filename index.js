import dotenv from 'dotenv';
dotenv.config()
import express from 'express';
import cors from "cors";
import connectDB from './config/db.js';
import userRouter from './routes/user.routes.js';
import productRouter from './routes/product.routes.js';

const app = express();

const port = process.env.PORT || 8000

// db
connectDB()

// middlewares
app.use(express.json());
app.use(cors({
  allowedHeaders: ["Content-Type", "Authorization", "token"]
}));

app.use("/api/v1/user/", userRouter);
app.use("/api/v1/product", productRouter);

app.get("/",(req,res)=>{
    res.json({message: "App Working"})
})

app.listen(port, ()=>{
    console.log(`Server started at port: ${port}`)
})
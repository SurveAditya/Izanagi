import express from 'express';
import Cors from 'cors';
import dotenv from "dotenv";
import connectDb from './config/db.js'
import productRoutes from './routes/productRoutes.js'

dotenv.config()

connectDb();

const app = express();

//middleware
app.use(Cors());

//requests
app.get("/",(req, res) => {
    res.send("API is running...");
})

app.use("/api/products",productRoutes)


const PORT = process.env.PORT || 5000
app.listen(
    PORT,
    console.log(`Server running on port ${PORT}`));
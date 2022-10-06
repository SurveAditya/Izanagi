import express from 'express';
import Cors from 'cors';
import dotenv from "dotenv";
import connectDb from './config/db.js'
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'

dotenv.config()

connectDb();

const app = express();
// allows us to use json data in body
app.use(express.json())

//middleware
app.use(Cors());

//requests
app.get("/",(req, res) => {
    res.send("API is running...");
})

app.use("/api/products",productRoutes);
app.use("/api/users",userRoutes);
app.use("/api/orders",orderRoutes);


const PORT = process.env.PORT || 5000
app.listen(
    PORT,
    console.log(`Server running on port ${PORT}`));
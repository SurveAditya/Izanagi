import express from 'express';
import products from './data/products.js';
import Cors from 'cors';
import dotenv from "dotenv";
import connectDb from './config/db.js'
dotenv.config()

connectDb();

const app = express();

//middleware
app.use(Cors());

//requests
app.get("/",(req, res) => {
    res.send("API is running...");
})


// so our json data about the product is at this location so we would like to
// make our frontend receive the data from here.
app.get("/api/products",(req, res) => {
    res.json(products);
    // even though the data is not actual jsom , res.json will convert it data to json type
})

app.get("/api/products/:id",(req, res) => {
        const product = products.find((p) => p._id === req.params.id);
        res.json(product);
})

const PORT = process.env.PORT || 5000
app.listen(
    PORT,
    console.log(`Server running on port ${PORT}`));
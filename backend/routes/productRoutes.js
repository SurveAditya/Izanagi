import express from 'express';
const router = express.Router();
import Product from '../models/productModel.js'
import asyncHandler from 'express-async-handler'

// so our json data about the product is at this location so we would like to
// make our frontend receive the data from here.
router.get("/",asyncHandler(async(req, res) => {
    const products = await Product.find({})
    res.json(products);
    // even though the data is not actual jsom , res.json will convert it data to json type
}))

router.get("/:id",asyncHandler(async(req, res) => {
        const product =  await Product.findById(req.params.id);
        if(product) {
            res.json(product);
        }else{
                res.status(404).json({message: "Product not found"})
        }
        
}))

export default router
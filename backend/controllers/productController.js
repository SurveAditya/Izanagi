import asyncHandler from "express-async-handler";
import Product from '../models/productModel.js'

// so our json data about the product is at this location so we would like to
// make our frontend receive the data from here.
const getProducts = asyncHandler(async(req,res) =>{
    const products = await Product.find({})
    res.json(products)
})

const getProductById = asyncHandler(async(req,res) =>{
    const product = await Product.findById(req.params.id)

    if(product){
        res.json(product)
    }
    else{
        res.status(404);
        throw new Error("Product not found");
    }
})

export {getProducts,getProductById}  
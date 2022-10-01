import express from 'express';
const router = express.Router();
import {getProducts,getProductById} from "../controllers/productController.js";

// we could use this
// router.get("/",getProduct);
// but we are going to say
router.route("/").get(getProducts);

// router.get("/:id",getProductById);

router.route("/:id").get(getProductById);


export default router
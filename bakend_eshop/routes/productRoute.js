import express from "express";
// import products from "../data/products.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import Product from "../models/productModel.js";

const router = express.Router();

//serving all the products
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.json(products);
  })
);

//route for single products
router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    // const product = products.find((p) => p._id === req.params.id); to get a single product, we no longer need to do this because we are not dealing with an array, we have our product model
    const product = await Product.findById(req.params.id); // if there is no product then we might have some error, so..
    if (product) {
      return res.json(product);
    } else {
      res.status(404);
      throw new Error("Resource not found");
    }
  })
);

export default router;

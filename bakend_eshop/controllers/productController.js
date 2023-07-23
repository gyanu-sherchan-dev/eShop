import asyncHandler from "../middlewares/asyncHandler.js";
import Product from "../models/productModel.js";



// @desc       Fetch all products
// @route      GET/api/products
// @access     Pubic
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});


// @desc       Fetch a product
// @route      GET/api/products/:id
// @access     Pubic
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id); // if there is no product then we might have some error, so..
  if (product) {
    return res.json(product);
  } else {
    res.status(404);
    throw new Error("Resource not found");
  }
});

export { getProducts, getProductById };

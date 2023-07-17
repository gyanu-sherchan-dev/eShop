import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import products from "./data/Products.js";
import mongoConnect from "./config/db.js";
const port = process.env.PORT || 5000;

mongoConnect(); //MongoDB connection

const app = express();

app.use(cors());

app.get("/", (req, res) => {
  res.send("API is running...");
});

//serving all the products
app.get("/api/products", (req, res) => {
  res.json(products);
});

//route for single products
app.get("/api/products/:id", (req, res) => {
  const product = products.find((p) => p._id === req.params.id);
  res.json(product);
});

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});

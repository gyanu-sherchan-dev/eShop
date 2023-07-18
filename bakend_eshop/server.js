import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import connectDB from "./config/db.js";
import productRoute from "./routes/productRoute.js";
const port = process.env.PORT || 5000;

connectDB(); //MongoDB connection

const app = express();

app.use(cors());

app.get("/", (req, res) => {
  res.send("API is running...");
});

//product route connection
app.use("/api/products", productRoute);

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});

import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import connectDB from "./config/db.js";
import { notFound, errorHandler } from "./middlewares/errorMiddleware.js";
import productRoute from "./routes/productRoute.js";
import userRoute from "./routes/userRoute.js";
const port = process.env.PORT || 5000;

connectDB(); //MongoDB connection

const app = express();

//body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running...");
});

//product route connection
app.use("/api/products", productRoute);
//user route connection
app.use("/api/users", userRoute);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});

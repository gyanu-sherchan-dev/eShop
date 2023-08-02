import jwt from "jsonwebtoken";
import asyncHandler from "./asyncHandler.js";
import User from "../models/userModel.js";

//Protect routes
const protect = asyncHandler(async (req, res, next) => {
  let token;

  //Read the jwt from the cookie
  token = req.cookies.jwt;
  console.log(token);
  if (token) {
    try {
      //extracting userId from payload by decoding
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.userId).select("-password"); //it will return all the fields, and we do not want the password even though it's hased, there is no reason to get that so, .select('-password')
      //since we passed it to the req.user, now the user object will be on the req object in all of our routes, so for instance if we are working in profile route we will be able to get the user from the req object and do what we want with it and it will be the user that's logged in
      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  } else {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

//Admin middleware
const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error("Not authorized as admin");
  }
};

export { protect, admin };

import asyncHandler from "../middlewares/asyncHandler.js";
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

// @desc       Auth user and get token
// @route      POST/api/users/login
// @access     Pubic
const authUser = asyncHandler(async (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  console.log(user);
  if (user && (await user.matchPassword(password))) {
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    //set JWT as HTTP-only cookie
    res.cookie("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days converting in miliseconds
    });

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
  res.json("user auth");
  res.json("user auth");
});

// @desc       Register user
// @route      POST/api/users
// @access     Pubic
const registerUser = asyncHandler(async (req, res) => {
  // const {email, password} = req.body;
  res.send("Register User");
});

// @desc       logout user/clear cookie
// @route      POST/api/users/logout
// @access     Private (because user need to login if they want to logout)
const logoutUser = asyncHandler(async (req, res) => {
  res.send("logout user");
});

// @desc       Get user profile
// @route      GET/api/users/profile
// @access     Private
const getUserProfile = asyncHandler(async (req, res) => {
  res.send("get user Profile");
});

// @desc       update user Profile
// @route      PUT/api/users/profile
// @access     Private
const updateUserProfile = asyncHandler(async (req, res) => {
  res.send("update user Profile");
});

// @desc       Get users
// @route      GET/api/users
// @access     Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  res.send("get Users");
});

// @desc       Get user by ID
// @route      GET/api/users/:id
// @access     Private/Admin
const getUsersByID = asyncHandler(async (req, res) => {
  res.send("get user By Id");
});

// @desc       Delete users
// @route      Delete/api/users/:id
// @access     Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  res.send("delete User");
});

// @desc       Update users
// @route      PUT/api/users/:id
// @access     Private/Admin
const updateUser = asyncHandler(async (req, res) => {
  res.send("Update User");
});

export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  getUsersByID,
  deleteUser,
  updateUser,
};

import asyncHandler from "../middlewares/asyncHandler.js";
import User from "../models/userModel.js";

// @desc       Auth user and get token
// @route      POST/api/users/login
// @access     Pubic
const authUser = asyncHandler(async (req, res) => {
  res.send("authUser");
});

// @desc       Register user
// @route      POST/api/users
// @access     Pubic
const registerUser = asyncHandler(async (req, res) => {
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

import asyncHandler from "../middlewares/asyncHandler.js";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

// @desc       Auth user and get token
// @route      POST/api/users/login
// @access     Pubic
const authUser = asyncHandler(async (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  console.log(user);
  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);

    res.status(200).json({
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
  const { name, email, password } = req.body;

  const userExist = await User.findOne({ email });
  if (userExist) {
    res.status(400);
    throw new Error("User already exists");
  }
  const user = await User.create({
    name,
    email,
    password,
  });
  if (user) {
    generateToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc       logout user/clear cookie
// @route      POST/api/users/logout
// @access     Private (because user need to login if they want to logout)
const logoutUser = asyncHandler(async (req, res) => {
  //clearing jwt form cookies
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({
    message: "Logged out successfully",
  });
});

// @desc       Get user profile
// @route      GET/api/users/profile
// @access     Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id); // remember when we logged in, we're authenticated, we have access to req.user, so we simply going to pass in that logged in user id.
  if (user) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc       update user Profile
// @route      PUT/api/users/profile
// @access     Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password;
    }
    const updatedUser = await user.save();
    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
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

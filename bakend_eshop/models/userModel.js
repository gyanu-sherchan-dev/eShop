import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false, //so inorder ot make an admin, we have to go into database and change that to true.
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;

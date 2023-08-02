import mongoose from "mongoose";
import bcrypt from "bcryptjs";

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
      default: false, //so inorder to make an admin, we have to go into database and change that to true.
    },
  },
  { timestamps: true }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

//hashing password while user register, here we going to use .pre instead of .method because it allows to do something before it saved in the database, so anything that has to do with user, if  we are saving something to database, if we use pre, then this will run before, becuase obiviously we want to hash the password before it gets saved to the database, you can also do .post which would do something after, but agian we need to do this before.
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    //if we are some user data, but not dealing with the password, then it's just going to next()
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt); //this refers to current user that we are saving
});

const User = mongoose.model("User", userSchema);
export default User;

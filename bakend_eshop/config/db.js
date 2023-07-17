import mongoose from "mongoose";

const mongoConnect = async () => {
  //its going to be async because any methods that we call, whether it's from a mongoose model or from mongoose itself, it's going to return promise.
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default mongoConnect;

import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "Please provide a username"],
    unique: true,
    minlength: [3, "Username should be at least 3 characters long."],
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [
      /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
      "Please fill a valid email address",
    ],
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minlength: [6, "Password should be at least 6 characters long."],
  },
  image: {
    type: String,
    default: "",
  },
});

const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;

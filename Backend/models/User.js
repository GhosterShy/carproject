import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },

  firstName: {
    type: String,
    required: true,
  },

  lastName: {
    type: String,
    required: true,
  },

  phone: {
    type: String,
    required: false,
  },

  avatar: {
    type: String,
    required: false,
  },
});

export const User = mongoose.model("User", UserSchema);

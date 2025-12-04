const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: true,
    minlength: [4, "Username must be at least 4 characters long"],
  },
  email:{
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: true,
    minlength: [13, "Username must be at least 4 characters long"],
  },
    password: { 
    type: String,
    required: true,
    trim: true,
    minlength: [6, "Password must be at least 6 characters long"],
  },
});

const User = mongoose.model("UserData", userSchema);

module.exports = User;

const express = require("express");
const { body, validationResult } = require("express-validator");
const userModel = require("../models/user.models");
const bcrypt = require("bcrypt");
const router = express.Router();
const jwt = require("jsonwebtoken");

router.get("/register", (req, res) => {
  res.render("register");
});

router.post(
  "/register",
  body("username").trim().isLength({ min: 3 }),
  body("email").trim().isEmail().isLength({ min: 10 }),
  body("password").trim().isLength({ min: 3 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: "Invalid data during registration",
      });
    }
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await userModel.create({
      username,
      email,
      password: hashedPassword,
    });

    // res.json(newUser); 
    res.redirect("/user/login");
  }
);

router.get("/login", (req, res) => {
  res.render("login");
});

router.post(
  "/login",
  body("username").trim().isLength({ min: 4 }),
  body("password").trim().isLength({ min: 6 }), 
  async(req,res) => {
    const eroors = validationResult(req);
    if(!eroors.isEmpty()){
      return res.status(400).json({
        errors: eroors.array(),
        message: "Invalid data during login"
      });
    }
    const {username, password} = req.body;
    const user = await userModel.findOne({
      username: username
    })
    if(!user){
      return res.status(400).json({
        message: "Invalid username or password"
      });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if(!isPasswordValid){
      return res.status(400).json({
        message: "Invalid username or password"
      });
    }
    const token = jwt.sign({
      userId: user._id,
      email: user.email,
      username: user.username
    },process.env.JWT_SECRET
  )
  res.cookie("token",token)
  // res.send("Login successful");
  res.redirect("/home");
  }
);
module.exports = router;

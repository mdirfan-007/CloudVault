require("dotenv").config();

const express = require("express");
const userRouter = require("./routes/user.routes");
const indexRouter = require("./routes/index.route");

const app = express();
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const connectToDB = require("./config/db");
dotenv.config();

connectToDB();
app.set("view engine", "ejs");
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get("/", (req, res) => {
  res.redirect("/user/register");
});

app.use("/", indexRouter);

app.use("/user", userRouter);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

const express = require("express");
const userRouter = express.Router();
const { userSignUp,userLogin } = require("../controller/userController");

userRouter.post("/api/v1/Signup", userSignUp);
userRouter.post("/api/v1/Login", userLogin);

module.exports = userRouter;

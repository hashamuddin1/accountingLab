const { users } = require("../model/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const userSignUp = async (req, res) => {
  try {
    if (!req.body.email) {
      return res.status(400).send({
        success: false,
        message: "Email Is Required",
      });
    }

    if (!req.body.first_name) {
      return res.status(400).send({
        success: false,
        message: "First Name Is Required",
      });
    }

    if (!req.body.last_name) {
      return res.status(400).send({
        success: false,
        message: "Last Name Is Required",
      });
    }

    if (!req.body.password) {
      return res.status(400).send({
        success: false,
        message: "Password Is Required",
      });
    }
    const checkEmail = await users.findOne({ email: req.body.email });
    if (checkEmail) {
      return res.status(400).send({
        success: false,
        message: "This Email is already Exist",
      });
    }
    const adduser = new users(req.body);
    var encryptedPassword = await bcrypt.hash(adduser.password, 10);
    adduser.password = encryptedPassword;
    let insertuser = await adduser.save();
    const token = jwt.sign(
      { email: adduser.email, _id: adduser._id },
      process.env.TOKEN_KEY,
      {
        expiresIn: "24h",
      }
    );
    return res.send({
      status: 200,
      message: "User has been created",
      data: adduser,
      token,
    });
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
};

const userLogin = async (req, res) => {
  try {
    if (!req.body.email) {
      return res.status(400).send({
        success: false,
        message: "Email Is Required",
      });
    }

    if (!req.body.password) {
      return res.status(400).send({
        success: false,
        message: "Password Is Required",
      });
    }
    const checkEmail = await users.findOne({ email: req.body.email });
    if (!checkEmail) {
      return res.status(400).send({
        success: false,
        message: "Invalid Email",
      });
    }

    if (
      checkEmail &&
      (await bcrypt.compare(req.body.password, checkEmail.password))
    ) {
      const token = jwt.sign(
        { email: checkEmail.email, _id: checkEmail._id },
        process.env.TOKEN_KEY,
        {
          expiresIn: "30d",
        }
      );

      return res.status(200).send({
        success: true,
        message: "User Login Successfully",
        data: checkEmail,
        token,
      });
    } else {
      return res.status(400).send({
        success: false,
        message: "Invalid Credentials",
      });
    }
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
};

module.exports = { userSignUp, userLogin };

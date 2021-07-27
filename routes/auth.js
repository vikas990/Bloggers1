const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();
require("../db/mongoose");
const User = require("../models/user");

router.get("/", (req, res) => {
  res.status(200).send("hello world!! Lets start MERN Stack!!");
});

router.get("/register", (req, res) => {
  res.status(200).send("register");
});

router.post("/register", async (req, res) => {
  const { fullname, phone, password, password2, email } = req.body;
  if (!fullname || !password || !phone || !email || !password2) {
    return res.status(422).json({ error: "All the fields are required!!" });
  }

  try {
    const userExist = await User.findOne({ email: email });

    if (userExist) {
      return res.status(422).json({ error: "Email alerady exist!!" });
    } else if (password != password2) {
      return res.status(422).json({ error: "passwords don't match!!" });
    } else if (password.length < 6) {
      return res.status(422).json({ error: "password must be of 6 length" });
    } else {
      const newUser = new User({
        fullname,
        phone,
        password,
        email,
      });

      const userRegister = await newUser.save();

      if (userRegister) {
        res.status(201).json({ message: "data saved successfully!!" });
      } else {
        res.status(201).json({ error: "Not saved!!" });
      }
    }
  } catch (error) {
    console.log(error);
  }
});

router.get("/login", async (req, res) => {});

router.post("/login", async (req, res) => {
  try {
    let token;
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(422).json({ error: "All the fields are required!!" });
    }
    const userLogin = await User.findOne({ email: email });
    if (userLogin) {
      const isMatch = await bcrypt.compare(password, userLogin.password);

      token = await userLogin.generateAuthToken();
      console.log(token);

      res.cookie("jwtToken", token, {
        expires: new Date(Date.now() + 25892000000),
      });

      if (isMatch) {
        res.status(200).json(userLogin);
      } else {
        res.status(400).json({ error: "Invaild credentials password" });
      }
    } else {
      res.status(400).json({ error: "Invaild credentials emial" });
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;

const User = require("../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userController = {};

const SALT_ROUNDS = 10;

userController.createUser = async (req, res) => {
  try {
    const {
      body: { email, name, password },
    } = req;
    const user = await User.findOne({ email });
    if (user) {
      throw new Error("The user already exists");
    }
    const salt = bcrypt.genSaltSync(SALT_ROUNDS);
    const hash = bcrypt.hashSync(password, salt);
    const newUser = new User({
      email,
      name,
      password: hash,
    });
    await newUser.save();
    res.status(200).json({ status: "ok" });
  } catch (error) {
    res.status(400).json({ status: "fail", error: error.message });
  }
};

userController.loginWithEmail = async (req, res) => {
  try {
    const {
      body: { email, password },
    } = req;
    const user = await User.findOne({ email }, "-createdAt -updatedAt -__v");
    if (user) {
      const isMatch = bcrypt.compareSync(password, user.password);
      if (isMatch) {
        const token = user.generateToken();
        return res.status(200).json({ status: "ok", user, token });
      }
    }
    throw new Error("Wrong Username or passowrd");
  } catch (error) {
    res.status(400).json({ status: "fail", error: error.message });
  }
};

module.exports = userController;

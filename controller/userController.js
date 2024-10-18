const User = require("../model/User");
const bcrypt = require("bcrypt");

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

// userController.login = async (req, res) => {
//   try {
//     const {
//       body: { email, password },
//     } = req;
//     const user = await User.findOne({ email });
//     if (!user) {
//         throw new Error("No user found");
//     }
//     bcrypt.compareSync(password, user.password);

//   } catch (error) {
//     res.status(400).json({ status: "fail", error: error.message });
//   }
// };

module.exports = userController;

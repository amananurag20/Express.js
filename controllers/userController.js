const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  console.log("login called");
  const { email, password } = req.body; //
  // check if user exists
  try {
    const existingUser = await userModel.findOne({ email: email });
    if (!existingUser) {
      return res.json({ message: "User does not exist", success: false });
    }

    console.log(password, existingUser);
    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordCorrect) {
      return res.json({ message: "wrong credential", success: false });
    }

    //token generate........

    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      process.env.JWT_SECRET,
      {
        expiresIn: "30m",
      }
    );

    res.cookie("token", token, {
      httpOnly: true,
      // maxAge: 1000 * 30,
      expires: new Date(Date.now() + 1000 * 60 * 60),
    });

    return res.json({ success: "true", userName: existingUser.name });
  } catch (e) {
    console.log(e);
    res.json({ message: "something went wrong", success: false });
  }
};

const signup = async function (req, res) {
  const { email, password, name } = req.body;

  if (!email || !password || !name) {
    return res.json({ message: "Please fill all the fields" }); //service layer
  }
  // check if user already exists

  try {
    const existingUser = await userModel.findOne({ email: email });
    if (existingUser) {
      return res.json({ message: "User already exists", success: false });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
      name: name,
      email: email,
      password: hashedPassword,
    });
    res.json({ success: true, user: user });
  } catch (e) {
    console.log(e);
    res.json({ success: false, message: "something went wrong" });
  }
};

const getUserDetails = async (req, res) => {
  console.log(req.cookies);
  const users = await userModel.find({ email: req.user?.email });
  return res.json({ users: users });
};

const getAllUsers = async (req, res) => {
  const users = await userModel.find({});
  return res.json({ users: users });
};

const updateUser = async (req, res) => {
  const id = req.params.id;
  const user = await userModel.findByIdAndUpdate(id, req.body, { new: true });
  res.json({ user });
};

const deleteUser = async (req, res) => {
  const id = req.params.id;
  const user = await userModel.findByIdAndDelete(id);
  res.json({ user });
};

const tokenVerification = async (req, res) => {
  const token = req.cookies?.token;

  if (!token) {
    return res.status(401).json({ valid: false, message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.status(200).json({ valid: true, user: decoded });
  } catch (err) {
    res.status(401).json({ valid: false, message: "Invalid or expired token" });
  }
};

module.exports = {
  login,
  signup,
  getUserDetails,
  getAllUsers,
  updateUser,
  deleteUser,
  tokenVerification,
};

const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("./models/userModel");
const verifyToken = require("./middleware/verifyToken");

const app = express();

const connectDb = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://amananurag20:j4DgBaxPkIrFOQcu@cluster0.dol4im4.mongodb.net/game"
    );
    console.log("mongodb connected");
  } catch (e) {
    console.log(e);
  }
};

connectDb();
// mongodb+srv://amananurag20:j4DgBaxPkIrFOQcu@cluster0.dol4im4.mongodb.net/
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post("/users/signup", async function (req, res) {
  const { email, password, name, phoneNumber } = req.body;

  if (!email || !password || !name || !phoneNumber) {
    return res.json({ message: "Please fill in all fields" });
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
      phoneNumber,
    });
    res.json({ success: true, user: user });
  } catch (e) {
    console.log(e);
    res.json({ success: false, message: "something went wrong" });
  }
});

app.post("/users/login", async (req, res) => {
  const { email, password } = req.body;
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
      "helloworld",
      {
        expiresIn: "30s",
      }
    );

    return res.json({ token, success: "true", userName: existingUser.name });
  } catch (e) {
    console.log(e);
    res.json({ message: "something went wrong", success: false });
  }
});

app.get("/users", verifyToken, async (req, res) => {
  const users = await userModel.find({ email: req.user.email });
  return res.json({ users: users });
});

app.get("/get-all-users", verifyToken, async (req, res) => {
  const users = await userModel.find({});
  return res.json({ users: users });
});

app.get("/users/:id", async (req, res) => {
  const id = req.params.id;
  const user = await userModel.findById(id);
  res.json({ user });
});

app.put("/users/:id", async (req, res) => {
  const id = req.params.id;
  const user = await userModel.findByIdAndUpdate(
    id,
    { email: "abc@gmail.com" },
    { new: true }
  );
  res.json({ user });
});

app.delete("/users/:id", async (req, res) => {
  const id = req.params.id;
  const user = await userModel.findByIdAndDelete(id);
  res.json({ user });
});
app.listen(5000, function () {
  console.log("server is running on port 5000");
});

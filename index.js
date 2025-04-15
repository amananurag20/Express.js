const express = require("express");
const mongoose = require("mongoose");

const userModel = require("./models/userModel");

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

app.post("/users", async function (req, res) {
  const { email, password, name, phoneNumber } = req.body;

  try {
    const user = await userModel.create({
      name: name,
      email: email,
      password,
      phoneNumber,
    });
    res.json({ success: true, user: user });
  } catch (e) {
    console.log(e);
    res.json({ success: false, message: "something went wrong" });
  }
});

app.listen(5000, function () {
  console.log("server is running on port 5000");
});

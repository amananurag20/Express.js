const express = require("express");
const mongoose = require("mongoose");

const app = express();

const connectDb = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://amananurag20:j4DgBaxPkIrFOQcu@cluster0.dol4im4.mongodb.net/"
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

app.get("/products", function (req, res) {
  res.send("<h1>This is highly credential data</h1>");
});

app.listen(5000, function () {
  console.log("server is running on port 5000");
});

const express = require("express");
const app = express();

app.get("/products", function (req, res) {
  console.log("route hit hua");
  res.send("<h1>get request product</h1>");
});

app.post("/products", function (req, res) {
  console.log("product route hit hua");
  res.send("post product ka data hai");
});

app.put("/products", function (req, res) {
  console.log("product route hit hua");
  res.send("product ka data hai");
});

app.delete("/products", function (req, res) {
  console.log("product route hit hua");
  res.send("product ka data hai");
});

app.listen(5000, function () {
  console.log("server is running on port 5000");
});

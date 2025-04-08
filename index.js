const express = require("express");
const app = express();

app.use(express.json());

app.get("/products", function (req, res) {
  console.log("route hit hua");
  console.log(req.query);
  res.send("<h1>get request product</h1>");
});

app.post("/products", function (req, res) {
  console.log("product route hit hua");
  console.log(req.body);
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

app.get("/products/:id", (req, res) => {
  console.log(req.params);
  res.send("this is product info");
});

app.listen(5000, function () {
  console.log("server is running on port 5000");
});

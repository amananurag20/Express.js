const express = require("express");

const app = express();

app.use(express.json()); //json->js object
app.use(express.urlencoded({ extended: false })); //parse form data

app.get("/products", function (req, res) {
  console.log("route hit hua");
  return res.send("hi dear");
  console.log("hi how are you");
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

app.get("/products/:name", (req, res) => {
  let name = req.params.name;
  console.log(req.query);

  res.send(`<h1>Welcome ${name}</h1>`);
});

app.listen(5000, function () {
  console.log("server is running on port 5000");
});

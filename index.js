const express = require("express");
const cookieParser = require("cookie-parser");
const userRouter = require("./routes/userRoutes");
const connectDb = require("./config/dbConnection");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();

connectDb();

app.use(
  cors({
    origin: ["http://localhost:5174"],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/users", userRouter);

// app.use((req, res, next) => {
//   console.log("hello");
//   next();
// });

app.get("/product", (req, res, next) => {
  // a;

  try {
    throw new Error("something is not working");
  } catch (e) {
    next(e);
    // res.status(502).json({ message: "not working ......." });
  }
});

app.use((err, req, res, next) => {
  console.log("error handling middleware");
  console.log(err);
  res.send("page not found");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, function () {
  console.log("server is running on port 5000");
});

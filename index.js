const express = require("express");
const cookieParser = require("cookie-parser");
const userRouter = require("./routes/userRoutes");
const connectDb = require("./config/dbConnection");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();

connectDb();

app.use(cors());

// mongodb+srv://amananurag20:j4DgBaxPkIrFOQcu@cluster0.dol4im4.mongodb.net/
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/users", userRouter);
// http://localhost:5000/users/signup

const PORT = process.env.PORT || 5000;
app.listen(PORT, function () {
  console.log("server is running on port 5000");
});

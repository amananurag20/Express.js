const express = require("express");
const cookieParser = require("cookie-parser");
const userRouter = require("./routes/userRoutes");
const connectDb = require("./config/dbConnection");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const { Server } = require("socket.io");

dotenv.config();
const http = require("http");

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials: true,
  },
});

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
connectDb();

// mongodb+srv://amananurag20:j4DgBaxPkIrFOQcu@cluster0.dol4im4.mongodb.net/
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/users", userRouter);

io.on("connection", (socket) => {
  console.log("user connected", socket.id);

  socket.on("textChange", (data) => {
    console.log("textChange", data);

    socket.broadcast.emit("updatedText", data);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, function () {
  console.log("server is running on port 5000");
});

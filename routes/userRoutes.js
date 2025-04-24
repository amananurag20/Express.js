const express = require("express");
const {
  signup,
  login,
  getUserDetails,
  getAllUsers,
  updateUser,
  tokenVerification,
} = require("../controllers/userController");
const verifyToken = require("../middleware/verifyToken");

const router = express.Router();

router.post("/signup", signup);

router.post("/login", login);

router.get("/", verifyToken, getUserDetails);

router.get("/get-all-users", verifyToken, getAllUsers);
// http://localhost:5000/users/signup
router.put("/:id", updateUser);
router.get("/verify-token", tokenVerification);

module.exports = router;

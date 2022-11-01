const express = require("express");
const {
  registerUser,
  loginUser,
  getAllUser,
} = require("../controllers/userController");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

router.route("/").get(protect, getAllUser);

router.post("/register", registerUser);
router.route("/login").post(loginUser);

module.exports = router;

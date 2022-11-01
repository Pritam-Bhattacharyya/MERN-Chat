const asyncHandler = require("express-async-handler");
const { generateToken } = require("../config/generateToken");
const User = require("../models/userModel");

// Registering an user
exports.registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, pic } = req.body;
  console.log(req.body, name, email, password);

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please Enter all fields");
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User Already Exists");
  }
  const user = await User.create({
    name,
    email,
    password,
    pic,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    res.status(200);
    throw new Error("Failed to create a User");
  }
});

// Login an User
exports.loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new Error("Enter email and password");
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Invalid Email or Password");
  }
  if (await user.checkPassword(password)) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid Email or Password");
  }
});

// Getting all users
exports.getAllUser = asyncHandler(async (req, res) => {
  const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};
  const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });

  res.status(200).json({
    users,
  });
});

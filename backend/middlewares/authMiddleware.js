const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");

exports.protect = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      // Decode token
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decodedToken.id).select("-password");
      next();
    } catch (error) {
      res.status(201);
      throw new Error("Not authorized . Token failed");
    }
  }else{
    res.status(201);
    throw new Error("Not authorized . No Token");
  }
});

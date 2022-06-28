const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const { promisify } = require("util");

const signToken = (id) => {
  return jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });
  const token = signToken(newUser._id);
  res.status(201).json({
    status: "success",
    token,
    data: {
      user: newUser,
    },
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  //1. check if email and password exist
  if (!email || !password) {
    return next(new AppError("Please provide email and password"), 400);
  }

  //check if user exists and password is correct
  const user = await User.findOne({ email: email }).select("+password");
  console.log(user);

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError("Please provide email and password"), 401);
  }
  //3. If everything is ok send token to client
  const token = signToken(user._id);
  return res.status(200).json({
    status: "Success",
    token,
  });
});

exports.protect = catchAsync(async (req, res, next) => {
  //1.Getting token and check if it is there
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
    console.log(token);
  }
  if (!token) {
    return next(new AppError("You are not logged in"), 401);
  }
  //2. Verification of the token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET); 
  console.log(decoded);

  //3. Check if user still exists
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(
      new AppError("The user belonging to this token does no longer exist"),401
    );
  }

  //4.check if user changed passwords after the token was issued
  if (currentUser.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError("This user recently changed password please login again"),
      401
    );
  }
  //Grant access to the protected route 
  req.user = currentUser
  next();
});

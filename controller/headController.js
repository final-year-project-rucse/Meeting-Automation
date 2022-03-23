const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const Head = require("../model/head");
const catchAsync = require("../utils/catchAsync");
const appError = require("../utils/appError");
const sendMail = require("../utils/email");
const { dataValidity, validateEmail } = require("../utils/validity");
const { promisify } = require("util");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET_KEY, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRE,
  });
};

exports.register = catchAsync(
  async (req, res, next) => {
    const head = await Head.create(req.body);

    res.status(201).json({
      status: "success",
      data: {
        head,
      },
    });
  }
);

exports.signIn = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new appError(`Please provide email and password`, 400));
  }
  const head = await Head.findOne({ email }).select("+password");
  if (!head || !(await head.checkPassword(password, head.password))) {
    return next(new appError(`Invalid email or password`));
  }

  res.status(200).json({
    status: "success",
    data: {
      user: head._id,
      token: signToken(head._id),
    },
    message: `Logged in Successfully!`,
  });
});

exports.protected = catchAsync(async (req, res, next) => {
  let token;
 // console.log("ok",req.headers);
  //console.log(req.headers);
  if (
    req.headers.authorization ||
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    return new appError(`You are not logged in! please login.`, 401);
  }

  const decoded = await promisify(jwt.verify)(
    token,
    process.env.ACCESS_TOKEN_SECRET_KEY
  );
  const loggedInUser = await Head.findById(decoded.id);
  if (!loggedInUser) {
    return next(
      new appError("The user belonging to this token does not exist", 401)
    );
  }

  req.user = loggedInUser;
  next();
});








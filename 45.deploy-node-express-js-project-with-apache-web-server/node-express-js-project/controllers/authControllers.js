require("dotenv").config();
const User = require("../models/User");
const jwt = require("jsonwebtoken");

const jwtSecret = process.env.JWT_SECRET;

const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = { email: "", password: "" };

  // Incorrect Email
  if (err.message === "Incorrect Email") {
    errors.email = "That Email is not registered";
  }

  // Incorrect password
  if (err.message === "Incorrect password") {
    errors.password = "That password is incorrect";
  }

  // Duplicate error code
  if (err.code === 11000) {
    errors.email = "That E-mail is already registered.";
    return errors;
  }

  // validation errors
  if (err.message.includes("user validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }
  return errors;
};

const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, jwtSecret, { expiresIn: maxAge });
};

const loginGet = (req, res) => {
  res.render("auth/login", { title: "Login" });
};

const loginPost = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(200).json({ user: user._id });
  } catch (error) {
    const errors = handleErrors(error);
    res.status(400).json({ errors });
  }
};

const registerGet = (req, res) => {
  res.render("auth/register", { title: "Register" });
};

const registerPost = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.create({ email, password });
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(201).json({ user: user._id });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};

const logoutGet = (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.redirect("/");
};

module.exports = {
  loginGet,
  loginPost,
  registerGet,
  registerPost,
  logoutGet,
};

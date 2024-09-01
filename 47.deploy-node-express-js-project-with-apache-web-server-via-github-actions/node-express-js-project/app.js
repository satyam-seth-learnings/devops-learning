require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const blogRoutes = require("./routes/blogRoutes");
const authRoutes = require("./routes/authRoutes");
const cookieParser = require("cookie-parser");
const { checkUser } = require("./middleware/authMiddleware");

const app = express();

const PORT = process.env.PORT || '3000';
const DATABASE_URL = process.env.DATABASE_URL;
const DB_OPTIONS = {
  dbName: process.env.DB_NAME,
  user: process.env.DB_USERNAME,
  pass: process.env.DB_PASSWORD,
}


mongoose
  .connect(DATABASE_URL, DB_OPTIONS)
  .then((result) => app.listen(PORT))
  .catch((err) => console.log(err));

// register view engine
app.set("view engine", "ejs");

// middleware and static files
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.get("*", checkUser);

app.get("/", (req, res) => {
  res.redirect("/blogs");
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

app.use("/blogs", blogRoutes);

app.use(authRoutes);

app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});

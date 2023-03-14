const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const cookiePraser = require("cookie-parser");
const { requireAuth, checkUser } = require("./middleware/authMiddleware");

const PORT = 3000;
const app = express();

// middleware
app.use(express.static("public"));
app.use(express.json());
app.use(cookiePraser());

// view engine
app.set("view engine", "ejs");

// database connection
const url = "mongodb://localhost:27017/jwt-practice";

mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((result) => app.listen(PORT, () => console.log("server started")))
  .catch((err) => console.log(err));

// routes
app.get("*", checkUser);
app.get("/", (req, res) => res.render("home"));
app.get("/smoothies", requireAuth, (req, res) => res.render("smoothies"));
app.use(authRoutes);

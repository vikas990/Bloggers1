const path = require("path");
const mongoose = require("mongoose");
const express = require("express");
const cookieParser = require("cookie-parser");
const multer = require("multer");
const cors = require("cors");
require("dotenv").config({ path: "./config.env" });
require("./db/mongoose");
// const User = require("./models/user");
const app = express();

const port = process.env.PORT;

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use("/images", express.static(path.join(__dirname, "images")));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });

app.post("/upload", upload.single("file"), (req, res) => {
  res.status(200).json("file has been uploaded");
});

const middleware = (req, res, next) => {
  console.log("middleware running!!");
  next();
};

app.use(require("./routes/auth"));
app.use(require("./routes/post"));

// server static assest if in production
if (process.env.NODE_ENV === "production") {
  //set static floder
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(port, () => console.log(`server up on :- ${port}`));

// dQ9C3z0L4jYQL9GD

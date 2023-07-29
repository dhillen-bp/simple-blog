const express = require("express");
const bodyParser = require("body-parser");
const authRoutes = require("./src/routes/auth");
const blogRoutes = require("./src/routes/blog");
const tagRoutes = require("./src/routes/tag");
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
require("dotenv").config();

const app = express();
const port = 4000;
const host = "localhost";

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, new Date().getTime() + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

app.use(bodyParser.json());
app.use("/images", express.static(path.join(__dirname, "images")));
app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).single("image")
);

// alternatif
const cors = require("cors");
app.use(cors());

app.use("/v1/auth", authRoutes);
app.use("/v1/blog", blogRoutes);
app.use("/v1/tag", tagRoutes);

app.use((error, req, res, next) => {
  const status = error.errorStatus || 500;
  const message = error.message;
  const data = error.data;

  res.status(status).json({ message: message, data: data });
});

mongoose
  .connect(process.env.MONGODB_URI) // replace with your driver mongo atlas
  .then(() => {
    app.listen(port, host, () => {
      console.log(`Blog News | listening at http://${host}:${port}`);
    });
  })
  .catch((err) => console.log(err));

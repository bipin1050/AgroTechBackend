const express = require("express");
const app = express();
app.use(express.json()); // Global Middleware

var cors = require("cors");
var path = require("path");
app.use(cors());

const cookieParser = require("cookie-parser");
app.use(cookieParser());

app.listen(8000);

const userRouter = require("./Routers/userRouter");
const planRouter = require("./Routers/planRouter");
const reviewRouter = require("./Routers/reviewRouter");
const bookingRouter = require("./Routers/bookingRouter");
const statusRouter = require("./Routers/statusRouter");
const multer = require("multer");

var htmlpath = path.join(__dirname, "public");
app.use(express.static(htmlpath));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname +
        "-" +
        Date.now() +
        "." +
        file.originalname.split(".").pop()
    );
  },
});

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    if (!file.mimetype.startsWith("image/")) {
      return cb(new Error("Only image files are allowed!"));
    }
    cb(null, true);
  },
});

app.get("/multer", async (req, res) => {
  res.sendFile(path.join(__dirname, "dmulter.html"));
});

app.post("/upload", upload.single("image"), function (req, res, next) {
  // req.file contains information about the uploaded file
  console.log(req.file);
  res.send("File uploaded successfully!");
});

app.use("/user", userRouter); // Base Route, Router to use
app.use("/plans", planRouter);
app.use("/review", reviewRouter);
app.use("/booking", bookingRouter);
app.use("/status", statusRouter);

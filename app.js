const express = require("express");
const app = express();
app.use(express.json()); // Global Middleware

var cors = require("cors");
var path = require("path");
app.use(cors());

const cookieParser = require("cookie-parser");
app.use(cookieParser());

app.listen(8000);

const cartModel = require("./models/cartModel");
const userModel = require("./models/userModel");
const planModel = require("./models/planModel");
const statusModel = require("./models/statusModel");

const userRouter = require("./Routers/userRouter");
const planRouter = require("./Routers/planRouter");
const reviewRouter = require("./Routers/reviewRouter");
const bookingRouter = require("./Routers/bookingRouter");
const statusRouter = require("./Routers/statusRouter");

var htmlpath = path.join(__dirname, "public");
app.use(express.static(htmlpath));

app.use("/user", userRouter); // Base Route, Router to use
app.use("/plans", planRouter);
app.use("/review", reviewRouter);
app.use("/booking", bookingRouter);
app.use("/status", statusRouter);

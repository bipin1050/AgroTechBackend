const express = require("express");

const statusRouter = express.Router();

const { protectRoute, isAuthorised } = require("../controller/authController");

const {
  getStatusFarmer,
  changeStatusFarmer,
} = require("../controller/statusController");

statusRouter.use(protectRoute);
statusRouter.route("/getStatusFarmer").post(getStatusFarmer);
statusRouter.route("/changeStatusFarmer").post(changeStatusFarmer);

// statusRouter.route("/getStatusTrucker").post(getStatusTrucker);

module.exports = statusRouter;

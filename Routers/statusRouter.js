const express = require("express");

const statusRouter = express.Router();

const { protectRoute, isAuthorised } = require("../controller/authController");

const {
  seeProductStatus,
  changeProductStatus,
  seeOnlineTruckerStatus,
} = require("../controller/statusController");

statusRouter.use(protectRoute);

statusRouter
  .route("/seeProductStatus")
  .post(isAuthorised(["farmer", "retailer"]), seeProductStatus);

statusRouter
  .route("/seeOnlineTruckerStatus")
  .post(isAuthorised(["admin"]), seeOnlineTruckerStatus);

statusRouter
  .route("/changeProductStatus")
  .post(isAuthorised(["trucker", "admin"]), changeProductStatus);

module.exports = statusRouter;

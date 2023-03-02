const express = require("express");

const statusRouter = express.Router();

const { protectRoute, isAuthorised } = require("../controller/authController");

const {
  seeProductStatusByFarmer,
  changeProductStatusbyTrucker,
  seeOnlineTruckerStatusByFarmer,
} = require("../controller/statusController");

statusRouter.use(protectRoute);

statusRouter
  .route("/changeProductStatusbyTrucker")
  .post(changeProductStatusbyTrucker);

statusRouter.use(isAuthorised(["farmer"]));
statusRouter.route("/seeProductStatusByFarmer").post(seeProductStatusByFarmer);
statusRouter
  .route("/seeOnlineTruckerStatusByFarmer")
  .post(seeOnlineTruckerStatusByFarmer);

module.exports = statusRouter;

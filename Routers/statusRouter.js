const express = require("express");

const statusRouter = express.Router();

const { protectRoute, isAuthorised } = require("../controller/authController");

const {
  seeProductStatus,
  changeProductStatus,
  seeOnlineTruckerStatus,
  postNotification,
  getNotification,
  updateNotificationStatus
} = require("../controller/statusController");


statusRouter.use(protectRoute);
statusRouter.route("/createNotification").post(postNotification)

statusRouter.route("/getNotification").post(getNotification)

statusRouter.route("/updateNotificationStatus").post(updateNotificationStatus)

statusRouter.route("/seeProductStatus").post(seeProductStatus);

statusRouter
  .route("/seeOnlineTruckerStatus")
  .post(isAuthorised(["admin"]), seeOnlineTruckerStatus);

statusRouter
  .route("/changeProductStatus")
  .post(isAuthorised(["trucker", "admin"]), changeProductStatus);

module.exports = statusRouter;

const express = require("express");

const statusRouter = express.Router();

const { protectRoute, isAuthorised } = require("../controller/authController");

const {
  seeProductStatus,
  changeProductStatus,
  seeOnlineTruckerStatus,
  postNotification,
  getNotification,
  updateNotificationStatus,
  getNotificationCount,
  assignTrucker,
  seeProductStatusByTrucker,
} = require("../controller/statusController");

statusRouter.use(protectRoute);
statusRouter.route("/createNotification").post(postNotification);

statusRouter.route("/getNotification").post(getNotification);
statusRouter.route("/getNotificationCount").post(getNotificationCount);

statusRouter.route("/updateNotificationStatus").post(updateNotificationStatus);

statusRouter.route("/seeProductStatus").post(seeProductStatus);
statusRouter
  .route("/seeProductStatusByTrucker")
  .post(seeProductStatusByTrucker);

statusRouter
  .route("/seeOnlineTruckerStatus")
  .post(isAuthorised(["admin"]), seeOnlineTruckerStatus);

statusRouter
  .route("/assignTrucker")
  .post(isAuthorised(["admin"]), assignTrucker);

statusRouter
  .route("/changeProductStatus")
  .post(isAuthorised(["trucker", "admin"]), changeProductStatus);

module.exports = statusRouter;

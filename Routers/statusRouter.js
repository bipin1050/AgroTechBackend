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
  seeProcessingStatus,
  seeTruckAssigned,
  seeProductDispatchedFromFarmer,
  seeProductInAgrotech,
  seeProductDispatchedFromAgrotech,
  seeProductDelivered,
  assignTrucker2
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
  .route("/assignTrucker2")
  .post(isAuthorised(["admin"]), assignTrucker2);

statusRouter
  .route("/changeProductStatus")
  .post(isAuthorised(["trucker", "admin"]), changeProductStatus);

statusRouter.use(isAuthorised(["admin"]))
statusRouter.route("/seeProcessingStatus").post(seeProcessingStatus)
statusRouter.route("/seeTruckAssigned").post(seeTruckAssigned)
statusRouter.route("/seeProductDispatchedFromFarmer").post(seeProductDispatchedFromFarmer)
statusRouter.route("/seeProductInAgrotech").post(seeProductInAgrotech)
statusRouter.route("/seeProductDispatchedFromAgrotech").post(seeProductDispatchedFromAgrotech)
statusRouter.route("/seeProductDelivered").post(seeProductDelivered)

module.exports = statusRouter;

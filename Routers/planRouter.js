const express = require("express");

const planRouter = express.Router();

const {
  protectRoute,
  isAuthorised,
  protectRouteForm,
} = require("../controller/authController");
const {
  getAllPlans,
  getPlan,
  createPlan,
  getPlanByFarmer,
  updatePlan,
  deletePlan,
  top3Plans,
  getCart,
  addCart,
  deleteCart,
  buyProduct,
  getCategory,
  productHelper,
  productList
} = require("../controller/planController");

const { upload } = require("../utility/multer");

planRouter.route("/allPlans/:id").get(getAllPlans);

planRouter.route("/plan/:id").get(getPlan);
planRouter.route("/getCategory").get(getCategory);

planRouter
  .route("/crudPlan")
  .post(
    protectRouteForm,
    isAuthorised(["admin", "farmer"]),
    upload.single("image"),
    createPlan
  );
planRouter.use(protectRoute);

planRouter.route("/getCart").post(getCart);
planRouter.route("/addCart").post(addCart);
planRouter.route("/deleteCart/:id").post(deleteCart);
planRouter.route("/buyProduct").post(buyProduct);

planRouter.use(isAuthorised(["admin", "farmer"]));
planRouter.route("/productList").post(productList)
planRouter.route("/productHelper").post(productHelper)
planRouter.route("/crudPlan/farmer").post(getPlanByFarmer);

planRouter.route("/crudPlan/:id").patch(updatePlan).delete(deletePlan);

planRouter.route("/top3").get(top3Plans);

module.exports = planRouter;

const express = require("express");

const planRouter = express.Router();

const { protectRoute, isAuthorised } = require("../controller/authController");
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
  buyProduct
} = require("../controller/planController");

planRouter.route("/allPlans/:id").get(getAllPlans);

planRouter.route("/plan/:id").get(getPlan);
planRouter.use(protectRoute);

planRouter.route("/getCart").post(getCart);
planRouter.route("/addCart").post(addCart);
planRouter.route("/deleteCart/:id").post(deleteCart)
planRouter.route("/buyproduct").post(buyProduct)

planRouter.use(isAuthorised(["admin", "farmer"]));
planRouter.route("/crudPlan").post(createPlan);

planRouter.route("/crudPlan/farmer").post(getPlanByFarmer);

planRouter.route("/crudPlan/:id").patch(updatePlan).delete(deletePlan);

planRouter.route("/top3").get(top3Plans);

module.exports = planRouter;

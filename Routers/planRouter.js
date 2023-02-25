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
} = require("../controller/planController");

planRouter.route("/allPlans").get(getAllPlans);

planRouter.use(protectRoute);
planRouter.route("/plan/:id").get(getPlan);

planRouter.use(isAuthorised(["admin", "farmer"]));
planRouter.route("/crudPlan").post(createPlan);

planRouter.route('/crudPlan/farmer').post(getPlanByFarmer)

planRouter.route("/crudPlan/:id").patch(updatePlan).delete(deletePlan);

planRouter.route("/top3").get(top3Plans);

module.exports = planRouter;

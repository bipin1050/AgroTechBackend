const express = require("express");

const reviewRouter = express.Router();

const { protectRoute,isAuthorised,protectRouteForm } = require("../controller/authController");
const {
  getAllReviews,
  top3Reviews,
  getPlanReviews,
  createReview,
  updateReview,
  deleteReview,
  getBlogs,
  getBlogsById,
  createBlogs
} = require("../controller/reviewController");

const {upload}=require("../controller/planController")

reviewRouter.route("/all").get(getAllReviews);

reviewRouter.route("/top3").get(top3Reviews);

reviewRouter.route("/getBlogs").get(getBlogs)
reviewRouter.route("/getBlogs/:id").get(getBlogsById)
reviewRouter.route("/:id").get(getPlanReviews);

reviewRouter.route('/createBlogs').post(protectRouteForm,isAuthorised(['Admin']),upload.single("image"),createBlogs)

reviewRouter.use(protectRoute);
reviewRouter
  .route("/crud/:plan")
  .post(createReview)
  .patch(updateReview)
  .delete(deleteReview);

module.exports = reviewRouter;

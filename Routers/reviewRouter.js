const express = require("express");

const reviewRouter = express.Router();

const { protectRoute } = require("../controller/authController");
const {
  getAllReviews,
  top3Reviews,
  getPlanReviews,
  createReview,
  updateReview,
  deleteReview,
  getBlogs,
  getBlogsById
} = require("../controller/reviewController");

reviewRouter.route("/all").get(getAllReviews);

reviewRouter.route("/top3").get(top3Reviews);

reviewRouter.route("/getBlogs").get(getBlogs)
reviewRouter.route("/getBlogs/:id").get(getBlogsById)
reviewRouter.route("/:id").get(getPlanReviews);


reviewRouter.use(protectRoute);
reviewRouter
  .route("/crud/:plan")
  .post(createReview)
  .patch(updateReview)
  .delete(deleteReview);

module.exports = reviewRouter;

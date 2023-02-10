const reviewModel = require("../models/reviewModel");
const planModel = require("../models/planModel");

module.exports.getAllReviews = async function getAllReviews(req, res) {
  try {
    const reviews = await reviewModel.find();
    if (reviews) {
      return res.json({
        message:
          "All reviews retrieved getAllReviews reviewController controller",
        data: reviews,
      });
    } else {
      return res.json({
        message: "Review not found getAllReviews reviewController controller",
      });
    }
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

module.exports.top3Reviews = async function top3Reviews(req, res) {
  try {
    const reviews = await reviewModel
      .find()
      .sort({
        rating: -1,
      })
      .limit(3);
    if (reviews) {
      return res.json({
        message:
          "Top 3 reviews are retrieved top3Reviews reviewController controller",
        data: reviews,
      });
    } else {
      return res.json({
        message: "Review not found top3Reviews reviewController controller",
      });
    }
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

module.exports.getPlanReviews = async function getPlanReviews(req, res) {
  try {
    let planid = req.params.id;
    let reviews = await reviewModel.find();
    reviews = reviews.filter((review) => review.plan._id == planid);
    if (reviews) {
      return res.json({
        message: "Review retrieved getPlanReviews reviewController controller",
        data: reviews,
      });
    } else {
      return res.json({
        message: "Review not found getPlanReviews reviewController controller",
      });
    }
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

module.exports.createReview = async function createReview(req, res) {
  try {
    let id = req.params.plan;
    let plan = await planModel.findById(id);
    let review = await reviewModel.create(req.body);
    plan.ratingsAverage = (plan.ratingsAverage + req.body.rating) / 2;
    await plan.save();
    res.json({
      message: "Review created createReview reviewController controller",
      data: review,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

module.exports.updateReview = async function updateReview(req, res) {
  let planid = req.params.id;
  let id = req.body.id;
  let dataToBeUpdated = req.body;
  let keys = [];
  for (let key in dataToBeUpdated) {
    // if (key == "id") continue;
    keys.push(key);
  }
  let review = await reviewModel.findById(id);
  for (let i = 0; i < keys.length; i++) {
    review[keys[i]] = dataToBeUpdated[keys[i]];
  }
  await review.save();
  return res.json({
    message:
      "Review updated successfully updateReview reviewController controller",
    data: review,
  });
};

module.exports.deleteReview = async function deleteReview(req, res) {
  try {
    let planid = req.params.id;
    let id = req.body.id;
    let review = await reviewModel.findByIdAndDelete(id);
    return res.json({
      message:
        "Review deleted successfully deleteReview reviewController controller",
      data: review,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

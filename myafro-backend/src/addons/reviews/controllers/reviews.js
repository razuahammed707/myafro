const ReviewModel = require("../models/reviews");

const createReview = async (req, res, next) => {
  try {
    const review = await ReviewModel.create({
      ...req.body,
      user: req.user.id,
    });
    res.status(200).send({
      status: true,
      message: "Review created successfully",
      review,
    });
  } catch (error) {
    next(error);
  }
};

const getReviews = async (req, res, next) => {
  try {
    const review = await ReviewModel.find({ createdAt: -1 })
      .populate("user")
      .populate("salon");
    res.status(200).send({
      status: true,
      message: "All reviews fetched",
      review,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createReview,
  getReviews,
};

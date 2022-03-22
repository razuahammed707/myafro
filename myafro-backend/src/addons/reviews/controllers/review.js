const ReviewModel = require("../models/review");

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
    const review = await ReviewModel.find({ salon: req.params.salonId }).sort({createdAt: -1})
      .populate("user","_id full_name email profile mobile role")
      .populate("salon","_id name location description user");
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

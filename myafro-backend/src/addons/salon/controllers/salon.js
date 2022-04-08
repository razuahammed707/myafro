const SalonModel = require("../model/salon");
const ReviewModel = require("../../reviews/models/review");
const createSalon = async (req, res, next) => {
  try {
    const salon = await SalonModel.create({
      ...req.body,
      user: req.user.id,
    });
    res.send({
      status: true,
      message: "Salon created succesfully",
      salon,
    });
  } catch (error) {
    next(error);
  }
};

const getSalons = async (req, res, next) => {
  try {
    let query = {};

    const salon_type = req.query.salon_type;
    const location = req.query.location;
    const hair_type = req.query.hair_type;

    if (salon_type) {
      query.salon_type = salon_type;
    }
    if (location) {
      query.location = location;
    }
    if (hair_type) {
      query.hair_type = {
        $in: hair_type.split(","),
      };
    }

    const salons = await SalonModel.find(query)
      .sort({ createdAt: -1 })
      .populate("user", "-password")
      .populate("review")
      .lean();

    const reviewsData = await ReviewModel.find().lean();

    salons.map((salon) => {
      let reviews = reviewsData.filter((review) => {
        if (salon._id.equals(review.salon)) {
          return review;
        }
      });
      const totalRatings = reviews.reduce(
        (acc, current) => acc + current?.rating,
        0
      );
      salon.reviews = reviews;
      salon.totalRatings = totalRatings;
    });

    res.send({
      status: true,
      salons,
    });
  } catch (error) {
    next(error);
  }
};

const getSalon = async (req, res, next) => {
  try {
    const salon = await SalonModel.findOne({ user: req.user.id })
      .populate("user", "-password")
      .populate("review");
    // const review = await ReviewModel.find({ salon: req.user.salon })
    //   .sort({ createdAt: -1 })
    //   .populate("user", "-password -otp -is_verified");
    res.send({
      status: true,
      salon,
      // review,
    });
  } catch (error) {
    next(error);
  }
};

const updateSalon = async (req, res, next) => {
  try {
    const salon = await SalonModel.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    if (salon) {
      res.status(200).send({
        status: true,
        message: "Salon is updated successfully",
        salon,
      });
    } else {
      res.status(400).send({
        status: false,
        message: "No records found regarding this id",
        salon,
      });
    }
  } catch (error) {
    next(error);
  }
};

const deleteSalon = async (req, res, next) => {
  try {
    const salon = await SalonModel.findByIdAndDelete({ _id: req.params.id });
    if (salon) {
      res.status(200).send({
        status: true,
        message: "Salon is deleted successfully",
        salon,
      });
    } else {
      res.status(400).send({
        status: false,
        message: "No records found regarding this id",
        salon,
      });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createSalon,
  getSalons,
  getSalon,
  updateSalon,
  deleteSalon,
};

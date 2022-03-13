const SalonModel = require("../model/salon");
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

    console.log(query);
    const salons = await SalonModel.find(query).populate("user", "-password");

    res.send({
      status: true,
      salons,
    });
  } catch (error) {
    next(error);
  }
};

const getSalon = async (req, res, next) => {
  console.log(req.user.id);
  try {
    const salon = await SalonModel.findOne({ user: req.user.id }).populate(
      "user",
      "-password"
    );
    res.send({
      status: true,
      salon,
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

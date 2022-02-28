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

    const category = req.query.category;
    const location = req.query.location;

    if (category) {
      query.category = category;
    }
    if (location) {
      query.location = location;
    }
    const salons = await SalonModel.find(query).populate("user", "-password");

    res.send({
      status: true,
      salons,
    });
  } catch (error) {
    next(error);
  }
};

const updateSalon = async (req, res, next) => {
  try {
    const salon = await SalonModel.findByIdAndUpdate(
      { _id: req.params.id },
      req.body,
      {
        new: true,
      }
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
  updateSalon,
  deleteSalon,
};
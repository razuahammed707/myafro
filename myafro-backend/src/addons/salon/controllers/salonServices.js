const SalonModel = require("../model/salon");

const createSalonServices = async (req, res, next) => {
  try {
    const { salonID } = req.params;
    const salon = await SalonModel.findByIdAndUpdate(
      { _id: salonID },
      {
        $push: {
          services: req.body,
        },
      },
      {
        new: true,
      }
    );
    res.send({
      status: true,
      message: "Service created succesfully",
      salon,
    });
  } catch (error) {
    next(error);
  }
};

const updateSalonServices = async (req, res, next) => {
  try {
    let { salonID, serviceID } = req.params;
    let {title}=req.body
    const salon = await SalonModel.findOneAndUpdate(
      { _id: salonID, "services._id": serviceID },

      { $set: { "services.$.title": title} },
      {
        new: true,
      }
    );
    res.send({
      status: true,
      message: "Service updated succesfully",
      salon,
    });
  } catch (error) {
    next(error);
  }
};

const deleteSalonServices = async (req, res, next) => {
  try {
    let { salonID, serviceID } = req.params;

    const salon = await SalonModel.findByIdAndUpdate(
      { _id: salonID },
      {
        $pull: {
          services: { _id: serviceID },
        },
      },
      {
        new: true,
      }
    );

    res.send({
      status: true,
      message: "Salon deleted succesfully",
      salon,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createSalonServices,
  deleteSalonServices,
  updateSalonServices,
};

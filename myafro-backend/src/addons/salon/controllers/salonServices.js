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

// const getServices = async (req, res, next) => {
//   try {
//     let salonID = req.user.id;
//     const services = await SalonModel.findById(salonID, {
//       services,
//     });
//     res.status(200).send({
//       status: true,
//       message: "Services retrieved successfully",
//       services,
//     });
//   } catch (error) {
//     next(error);
//   }
// };

const updateSalonServices = async (req, res, next) => {
  try {
    let { salonID, serviceID } = req.params;
    const salon = await SalonModel.findByIdAndUpdate(
        { _id: salonID },
        { services: { _id: serviceID } },
        {
          $push: {
            services: { title: req.body },
          },
        },
        {
          new: true,
        }
      );
    //   {
    //     $set: {
    //       "services.$.title": req.body.title,
    //     },
    //   },
    //   {
    //     'new': true, 'safe': true, 'upsert': true
    //   }
    
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
      message: "Salon created succesfully",
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

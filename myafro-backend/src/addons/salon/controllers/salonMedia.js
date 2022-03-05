const SalonModel = require("../model/salon");

const createSalonMedia = async (req, res, next) => {
  try {
    const uploadImage = req.file;
    if (uploadImage) {
      const { salonID } = req.params;
      const salon = await SalonModel.findByIdAndUpdate(
        { _id: salonID },
        {
          $push: {
            media: {
              img_url: process.env.PHOTO_URL + req.file.filename,
            },
          },
        },
        {
          new: true,
        }
      );
      res.status(200).send({
        status: true,
        message: "Media added successfully",
        salon,
      });
    } else {
      res.status(404).send({
        status: false,
        message: "Something went wrong with file upload",
      });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const deleteSalonMedia = async (req, res, next) => {
  try {
    let { salonID, mediaID } = req.params;

    const salon = await SalonModel.findByIdAndUpdate(
      { _id: salonID },
      {
        $pull: {
          media: { _id: mediaID },
        },
      },
      {
        new: true,
      }
    );

    res.send({
      status: true,
      message: "Media deleted succesfully",
      salon,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createSalonMedia,
  deleteSalonMedia,
};

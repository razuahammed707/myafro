const BookingModel = require('../models/bookings')

const createCurrentHairMedia = async (req, res, next) => {
    try {
      const uploadImage = req.file;
      if (uploadImage) {
        const booking = await BookingModel.findByIdAndUpdate(
          { _id: req.params.bookingId },
          {
            $push: {
              current_hair: {
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
          message: "Current hair added successfully",
          booking,
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

  const getCurrentMedia = async (req, res, next) => {
    try {
        const media = await BookingModel.find({_id: req.params.bookingId})
        res.status(200).send({
            status: true,
            media
        })
    } catch (error) {
        next(error)
    }
  }

  module.exports = {
      createCurrentHairMedia,
      getCurrentMedia
  }
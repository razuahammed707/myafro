const BookingModel = require("../models/bookings");

const createMessage = async (req, res, next) => {
  try {
    const newMessage = await BookingModel.findByIdAndUpdate(
      { _id: req.params.bookingId },
      {
        $push: {
          messages: req.body,
        },
      },
      {
        new: true,
      }
    );
    res.status(200).send({
      status: true,
      message: "message created successfully",
      newMessage,
    });
  } catch (error) {
    next(error);
  }
};

const getMessages = async (req, res, next) => {
    try {
        const messages = await BookingModel.find({_id: req.params.bookingId})
        res.status(200).send({
            status: true,
            messages
        })
    } catch (error) {
        next(error)
    }
}

module.exports = {
  createMessage,
  getMessages
};

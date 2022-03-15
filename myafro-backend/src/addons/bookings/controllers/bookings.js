const BookingModel = require("../models/bookings");

const createBooking = async (req, res, next) => {
  try {
    const booking = await BookingModel.create({
      ...req.body,
      user: req.user.id,
      salon: req.body.salon,
    });
    res.status(200).send({
      status: true,
      messasge: "Booking is successful",
      booking,
    });
  } catch (error) {
    next(error);
  }
};

const getBookings = async (req, res, next) => {
  try {
    console.log(req.user);
    const booking = await BookingModel.find({ salon: req.user.salon })
      .populate("user", "_id full_name email profile mobile")
      .populate("salon", "_id name location");
    res.send({
      status: true,
      message: "All booking fetched successfully",
      booking,
    });
  } catch (error) {
    next(error);
  }
};

const updateBooking = async (req, res, next) => {
  try {
    const booking = await BookingModel.findByIdAndUpdate(
      { _id: req.params.id },
      req.body,
      {
        new: true,
      }
    );
    if (booking) {
      res.status(200).send({
        status: true,
        message: "Booking info is updated successfully",
        booking,
      });
    } else {
      res.status(400).send({
        status: false,
        message: "No records found regarding this id",
      });
    }
  } catch (error) {
    next(error);
  }
};

const deleteBooking = async (req, res, next) => {
  try {
    const booking = await BookingModel.findByIdAndDelete({
      _id: req.params.id,
    });
    if (booking) {
      res.status(200).send({
        status: true,
        message: "Booking is deleted successfully",
      });
    } else {
      res.status(400).send({
        status: false,
        message: "No records found regarding this id",
      });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createBooking,
  getBookings,
  updateBooking,
  deleteBooking,
};

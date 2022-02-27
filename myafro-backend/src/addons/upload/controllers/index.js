// const { ErrorHandler } = require("../../../helpers/errors");

const uploadImage = async (req, res, next) => {
  try {
    const uploadImage = req.file;
    console.log(uploadImage)
    if (uploadImage) {
      res.send({
        status: true,
        img_url: process.env.PHOTO_URL + req.file.filename
      });
    } else {
      res.status(404).send({
        status: false,
        message: "Something went wrong with file upload"
      });
    }
  } catch (error) {
    console.log(error)
    next(error);
  }
};

module.exports = {
  uploadImage,
};

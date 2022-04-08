const { imageUploader } = require("../utils/fileUpload");

const logoUpload = (req, res, next) => {
  const upload = imageUploader(
    ["image/jpg", "image/jpeg", "image/png"],
    1000000
  );

  //call the middleware function
  upload.single('profile')(req, res, (err) => {
    if (err) {
      console.log(err)
      res.send({
        status: false,
        message: err,
      });
    } else {
      next();
    }
  });
};

module.exports = logoUpload;
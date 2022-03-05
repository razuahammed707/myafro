const { imageUploader } = require("../utils/fileUpload");

const imageUpload = (req, res, next) => {
  const upload = imageUploader(
    ["image/jpg", "image/jpeg", "image/png"],
    1000000
  );

  //call the middleware function
  upload.single('img_url')(req, res, (err) => {
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

module.exports = imageUpload;
const multer = require("multer");
const path = require("path");
// const { ErrorHandler } = require("../helpers/errors");

const imageUploader = (allowed_file_types, max_file_size) => {
  const UPLOAD_FOLDER = `${__dirname}/../public/uploads/`;

  //define the file storage
  const storage = multer.diskStorage({
    destination: (req, file, callback) => {
      callback(null, UPLOAD_FOLDER);
    },
    filename: (req, file, callback) => {
      const fileExtension = path.extname(file.originalname);
      const fileName =
        file.originalname
          .replace(fileExtension, "")
          .toLowerCase()
          .split(" ")
          .join("-") +
        "-" +
        Date.now();
      callback(null, fileName + fileExtension);
    },
  });

  const upload = multer({
    storage: storage,
    limits: {
      fileSize: max_file_size,
    },
    fileFilter: (req, file, callback) => {
      if (allowed_file_types.includes(file.mimetype)) {
        callback(null, true);
      } else {
        // throw new ErrorHandler(
        //   "Only jpg, jpeg and png file extension is allowed"
        // );
        res.status(400).send({
            status: false,
            message:  "Only jpg, jpeg and png file extension is allowed"
        })
      }
    },
  });

  return upload;
};

module.exports = {
  imageUploader
};
const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (authorization) {
      const token = authorization.split(" ")[1];
      const user = await jwt.verify(token, process.env.JWT_SECRET);
      req.user = user;
      next();
    } else {
      res.send({
        status: false,
        message: "You are not authenticated",
      });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  verifyToken,
};

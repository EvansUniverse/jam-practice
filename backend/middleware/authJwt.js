const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.user;

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({
      message: "No token provided"
    });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized"
      });
    }
    req.userId = decoded.id;
    next();
  });
};

isAdmin = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    if (user.role ===  'admin'){
      next();
    } else {
      res.status(403).send({
        message: "This operation requires Admin permissions."
      });
    }
    return;
  });
};

isModerator = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    if (user.role ===  'admin' || user.role === 'moderator'){
      next();
    } else {
      res.status(403).send({
        message: "This operation requires Moderator permissions."
      });
    }
    return;
  });
};

const authJwt = {
  verifyToken: verifyToken,
  isAdmin: isAdmin,
  isModerator: isModerator
};
module.exports = authJwt;

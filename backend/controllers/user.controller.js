const db = require("../models");
const User = db.user;
const Op = db.Sequelize.Op;
const config = require("../config/auth.config.js");
const jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

// Get account info for the user with the given id.
// This function assumes that the request has a valid, verified token.
exports.getUser = (req, res) => {
  // Get the id matching the supplied token
  // TODO DRY, refactor
  let token = req.headers["x-access-token"];
  var id = null;
  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Error"
      });
    }
    id = decoded.id;
  });

  // Get data for the user matching that id
  User.findOne({
    where: { id: id }
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({ message: err.message || "Unknown error"});
    });
};

// Update the role, username, email, and/or password for the user with the given id.
exports.update = (req, res) => {  
  // Get the id matching the supplied token
  // TODO DRY, refactor
  let token = req.headers["x-access-token"];
  var id = null;
  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Error"
      });
    }
    id = decoded.id;
  });

  if(req.body.username){
    User.update(
      { username: req.body.username },
      { where: { id: id } })
      .catch(err => {
        res.status(500).send({ message: err.message || "Unknown error" });
      });
  }

  if(req.body.email){
    User.update(
      { email: req.body.email },
      { where: { id: id } })
      .catch(err => {
        res.status(500).send({ message: err.message || "Unknown error" });
      });
  }

  if(req.body.password){
    User.update(
      { password: bcrypt.hashSync(req.body.password, 8) },
      { where: { id: id } })
      .catch(err => {
        res.status(500).send({ message: err.message || "Unknown error" });
      });
  }

  res.send({ message: "User updated successfully." });

};
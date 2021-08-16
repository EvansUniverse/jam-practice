const db = require("../models");
const User = db.user;

// Returns a 400 error if either the 'username' or 'email' in
// request.body already in use.
checkDuplicateUsername = (req, res, next) => {
  if(req.body.username){
    User.findOne({
      where: { username: req.body.username }
    }).then(user => {
      if (user) {
        console.log("Duplicate username rejected")
        res.status(400).send({
          message: "Failed: This username is already taken."
        });
        //return;
      }
    });
  }
  next();
};

checkDuplicateEmail = (req, res, next) => {
  if(req.body.email){
    User.findOne({
      where: { email: req.body.email }
    }).then(user => {
      if (user) {
        console.log("Duplicate email rejected")
        res.status(400).send({
          message: "This email is already taken."
        });
        //return;
      }
    });
  }
  next();
}

// Returns a 400 error if the 'role' in request.body is not a valid role type
checkRoleExists = (req, res, next) => {
  if (req.body.role) {
    if(!User.rawAttributes.role.values.includes(req.body.role)){
      res.status(400).send({
        message: `Role "${req.body.role}" does not exist.`
      });
    }
  }

  next();
};

// TODO implement this
validateEmail = (req, res, next) => {
  if (req.body.email) {
    var valid = true;
    if (!valid) {
      res.status(400).send({
        message: "Invalid email address."
      });
      return;
    }
  }

  next();
};

const verifySignUp = {
  checkDuplicateUsername: checkDuplicateUsername,
  checkDuplicateEmail: checkDuplicateEmail,
  checkRoleExists: checkRoleExists
  // validateEmail: validateEmail
};

module.exports = verifySignUp;

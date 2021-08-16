const { authJwt } = require("../middleware");
const { verifySignUp } = require("../middleware");
const controller = require("../controllers/user.controller");

module.exports = app => {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  var router = require("express").Router();

  // Get currently logged in user's information
  router.get(
    '/', 
    [ authJwt.verifyToken ],
    controller.getUser
  );

  // Update username, email, or password
  router.put(
    '/update', 
    [
      authJwt.verifyToken,
      verifySignUp.checkDuplicateUsername,
      verifySignUp.checkDuplicateEmail
    ], 
    controller.update
  );

  app.use('/api/user', router);
};
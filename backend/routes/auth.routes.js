const { verifySignUp } = require("../middleware");
const controller = require("../controllers/auth.controller");

module.exports = app => {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  var router = require("express").Router();

  // Create a new user with the given credentials
  router.post(
    '/register',
    [
      verifySignUp.checkDuplicateUsername,
      verifySignUp.checkDuplicateEmail,
      verifySignUp.checkRoleExists
    ],
    controller.register
  );

  // Log in with an existing username and password, receive an auth token.
  router.post('/login', controller.login);

  app.use('/api/auth', router);
};

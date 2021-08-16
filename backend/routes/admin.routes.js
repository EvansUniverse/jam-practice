const { authJwt } = require("../middleware");
const { verifySignUp } = require("../middleware");
const controller = require("../controllers/admin.controller");

module.exports = app => {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  var router = require("express").Router();

  // Get all users, or supply the parameter "criteria" to search for users
  router.get(
    '/users/',
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.usersGetAll
  );

  // Get user by ID
  router.get(
    '/users/:id', 
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.usersFindOne
  );

  // Update one or more of a user's attributes
  router.put(
    '/users/:id/update', 
    [
      authJwt.verifyToken,
      authJwt.isAdmin,
      verifySignUp.checkRoleExists,
      verifySignUp.checkDuplicateUsername,
      verifySignUp.checkDuplicateEmail
    ], 
    controller.usersUpdate
  );

  // Delete a user
  router.post(
    '/users/:id/delete', 
    [authJwt.verifyToken, authJwt.isAdmin], 
    controller.usersDelete
  );

  app.use('/api/admin', router);
};
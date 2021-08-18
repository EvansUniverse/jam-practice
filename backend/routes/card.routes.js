const { authJwt } = require("../middleware");
const { verifySignUp } = require("../middleware");
const controller = require("../controllers/card.controller");

module.exports = app => {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  var router = require("express").Router();

  // Get all cards, or supply the parameter "criteria" to search for cards
  router.get(
    '/',
    [authJwt.verifyToken, authJwt.isUser],
    controller.usersGetAll
  );

  // Get card by ID
  router.get(
    '/:id', 
    [authJwt.verifyToken, authJwt.isUser],
    controller.cardsFindOne
  );

  // Update one or more of a card's attributes
  router.put(
    '/:id/update', 
    [
      authJwt.verifyToken,
      authJwt.isUser,
      // TODO verify unique uuid or generate one
      //
      // verifySignUp.checkRoleExists,
      // verifySignUp.checkDuplicateUsername,
      // verifySignUp.checkDuplicateEmail
    ], 
    controller.cardsUpdate
  );

  // Delete a card
  router.post(
    '/:id/delete', 
    [authJwt.verifyToken, authJwt.isUser], 
    controller.cardsDelete
  );

  app.use('/api/cards', router);
};
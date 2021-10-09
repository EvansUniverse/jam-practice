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
    '',
    [authJwt.verifyToken, authJwt.isUser],
    controller.cardsGetAll
  );

  // Get card by ID
  router.get(
    '/:id', 
    [authJwt.verifyToken, authJwt.isUser],
    controller.cardsFindOne
  );

  // Update one or more of a card's attributes
  router.put(
    '/:id', 
    [authJwt.verifyToken, authJwt.isUser], 
    controller.cardsUpdate
  );

  // Delete a card
  router.delete(
    '/:id', 
    [authJwt.verifyToken, authJwt.isUser], 
    controller.cardsDelete
  );

  // Delete all cards
  router.delete(
    '', 
    [authJwt.verifyToken, authJwt.isAdmin], 
    controller.cardsDeleteAll
  );

   // Create a new card
   router.post(
    '',
    [authJwt.verifyToken, authJwt.isUser],
    controller.create
  );

  app.use('/api/cards', router);
};
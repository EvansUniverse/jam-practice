const db = require("../models");
const { utils } = require("../middleware");
const Card = db.card;
const Op = db.Sequelize.Op;

// TODO add Create endpoint with auto uuid generation


// Gets a list of all cards.
//
// If page and size are supplied in the request parameters, returns
// paginated result.
//
// If criteria is supplied in the request parameters, returns cards
// whos titles contain the criteria.
exports.cardsGetAll = (req, res) => {
  const criteria = req.query.criteria;
  const page = req.query.page;
  const size = req.query.size;
  var params = {}

  if (page && size){
    params.limit = parseInt(size);
    params.offset = parseInt(page) * params.limit;
  }

  if(criteria){ 
    params.where = {title : { [Op.like]: `%${criteria}%` }};
  }

  Card.findAndCountAll(params)
    .then(data => {
      const response = getPagingData(data, page, size);
      res.send(response);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Unknown error"});
    });
}

// Helper function for pagination
function getPagingData(data, page, size){
  const { count: totalItems, rows: items } = data;
  const currentPage = page ? + parseInt(page) : 0;
  const totalPages = size ? Math.ceil(totalItems / parseInt(size)) : 1;

  return { totalItems, items, totalPages, currentPage };
};

// Get the card with the specified id.
exports.cardsFindOne = (req, res) => {
  const id = req.params.id;
  Card.findOne({
    where: { id: id }
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({ message: err.message || "Unknown error"});
    });
};

// Update the card with the specified id.
exports.cardsUpdate = (req, res) => {
  const id = req.params.id;
  if(req.body.title){
    Card.update(
      { title: req.body.title },
      { where: { id: id } })
      .catch(err => {
        res.status(500).send({ message: err.message || "Unknown error" });
      });
  }

  if(req.body.content){
    Card.update(
      { content: req.body.content },
      { where: { id: id } })
      .catch(err => {
        res.status(500).send({ message: err.message || "Unknown error" });
      });
  }

  if(req.body.difficulty){
    Card.update(
      { difficulty: req.body.difficulty },
      { where: { id: id } })
      .catch(err => {
        res.status(500).send({ message: err.message || "Unknown error" });
      });
  }

  if(req.body.ispublic){
    Card.update(
      { ispublic: req.body.ispublic },
      { where: { id: id } })
      .catch(err => {
        res.status(500).send({ message: err.message || "Unknown error" });
      });
  }

  res.send({ message: "Card updated successfully." });
};

// Delete the card with the specified id.
exports.cardsDelete = (req, res) => {
  const id = req.params.id;

  Card.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num >= 1) {
        res.send({
          message: `Card ${id} was deleted successfully.`
        });
      } else {
        res.send({
          message: `Failed to delete card ${id}. Maybe the id was not found?`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: `Failed to delete card ${id}.`
      });
    });
};

// Create a new card
exports.create = (req, res) => {
  Card.create({
    id: newCardUuid(),
    title: req.body.title,
    difficulty: req.body.difficulty,
    content: req.body.content,
    ispublic: req.body.ispublic
  })
    .then(card => {
      res.send({ 
        message: "Card was created successfully!", 
        id: card.id 
      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message || "Unknown error"});
    });
};

newCardUuid = () => {
  // Generate a new uuid
  uuid = utils.generateUUID()

  // TODO If there's a collision, re-generate uuid
  return uuid
};
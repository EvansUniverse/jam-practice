const db = require("../models");
const User = db.user;
const Op = db.Sequelize.Op;


// Gets a list of all users.
//
// If page and size are supplied in the request parameters, returns
// paginated result.
//
// If criteria is supplied in the request parameters, returns users
// with usernames containing the criteria.
exports.usersGetAll = (req, res) => {
  const criteria = req.query.criteria;
  const page = req.query.page;
  const size = req.query.size;
  var params = {}

  if (page && size){
    params.limit = parseInt(size);
    params.offset = parseInt(page) * params.limit;
  }

  if(criteria){ 
    params.where = {username : { [Op.like]: `%${criteria}%` }};
  }

  User.findAndCountAll(params)
    .then(data => {
      const response = getPagingData(data, page, size);
      res.send(response);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Unknown error."});
    });
}

// Helper function for pagination
function getPagingData(data, page, size){
  const { count: totalItems, rows: items } = data;
  const currentPage = page ? +parseInt(page) : 0;
  const totalPages = size ? Math.ceil(totalItems / parseInt(size)) : 1;

  return { totalItems, items, totalPages, currentPage };
};

// Find the user with the specified id.
exports.usersFindOne = (req, res) => {
  const id = req.params.id;
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

// Update the role, username, and/or email of the user with the specified id.
exports.usersUpdate = (req, res) => {
  const id = req.params.id;
  if(req.body.role){
    User.update(
      { role: req.body.role },
      { where: { id: id } })
      .catch(err => {
        res.status(500).send({ message: err.message || "Unknown error" });
      });
  }

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

  res.send({ message: "User updated successfully" });
};

// Delete the user with the specified id.
exports.usersDelete = (req, res) => {
  const id = req.params.id;

  User.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num >= 1) {
        res.send({
          message: `User ${id} was deleted successfully.`
        });
      } else {
        res.send({
          message: `Failed to delete User ${id}. Maybe the id was not found?`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: `Failed to delete User ${id}`
      });
    });
};
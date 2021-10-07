const {
  DB_HOST, 
  //DB_PORT,
  DB_DB,
  DB_USER,
  DB_PASSWORD
} = process.env;

const Sequelize = require("sequelize");
const sequelize = new Sequelize(DB_DB, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: "mysql",
  operatorsAliases: 0, // 0=false

  pool: {            // optional, will be used for Sequelize connection pool configuration
    max: 5,          // maximum number of connections in pool
    min: 0,          // minimum number of connections in pool
    acquire: 30000,  // maximum time, in milliseconds, that pool will try to get connection before throwing error
    idle: 10000      // maximum time, in milliseconds, that a connection can be idle before being released
  }
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.card = require("../models/card.model.js")(sequelize, Sequelize);
db.user = require("../models/user.model.js")(sequelize, Sequelize);

module.exports = db;
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const config = require("./config/config");

const app = express();

// TODO figure out whether or not i need this
// var corsOptions = {
//   origin: "http://localhost:8081"
// };

app.use(cors());

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./models");
const authConfig = require("./config/auth.config");
const User = db.user;
db.sequelize.sync();

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

// In development, you may need to drop existing tables and re-sync database.
// If true, enables this behavior.
//
// If this is not enabled, you'll have to insert these values manually.
const DEV_RESET_DB = process.env.DEV_RESET_DB || false;
if(DEV_RESET_DB === "true"){
  db.sequelize.sync({ force: true }).then(() => {
    console.log("DEV_RESET_DB enabled; dropping and re-syncing db.");
    initializeDb();
  });
}

require('./routes/auth.routes')(app);
require('./routes/admin.routes')(app);
require('./routes/user.routes')(app);
require('./routes/card.routes')(app);

const PORT = process.env.PORT || config.defaultPort;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

function initializeDb() {
  console.log("Performing initial database initialization.")

  // Create default admin user
  User.create({
    username: authConfig.defaultAdminUsername,
    email: authConfig.defaultAdminEmail,
    password: bcrypt.hashSync(authConfig.defaultAdminUsername, 8),
    role: 'admin'
  })
    .catch(err => {
      console.log(`Error creating default admin user ${err}`)
    });
}
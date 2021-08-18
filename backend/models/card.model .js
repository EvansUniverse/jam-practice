module.exports = (sequelize, Sequelize) => {
    const Card = sequelize.define("cards", {
      id: {
        type: Sequelize.STRING,
        primaryKey: true
      },
      title: {
        type: Sequelize.STRING,
        defaultValue: ""
      },
      // tags: {
      //   // A JSON object containing a string array
      //   type: Sequelize.JSON
      // },
      difficulty: {
        type: Sequelize.ENUM,
        values: ['beginner', 'easy', 'medium', 'hard', 'expert', 'n/a'],
        defaultValue: 'n/a'
      },
      // TODO: create a hasMany relationship https://sequelize.org/master/class/lib/associations/base.js~Association.html
      //
      // links: {
      //  
      // },
      content: {
        type: Sequelize.STRING,
        defaultValue: ""
      },
      // variables: {
      //   // JSON object containing array of variable objects:
      //   // {
      //   //   "variables": {
      //   //     "name": String,
      //   //     "definition": String
      //   //   }[]
      //   // }
      //   //
      //   // Alternative: string to be parsed with syntax "VAR_NAME:value_string" Note that variables can reference other varialbes,
      //   // as long as there's no circular dependency. There is a default library of variables provided by the site, which are used 
      //   // as the building blocks of variables. The syntax for this is "VAR_NAME:{SOME_OTHER_VAR}, Some variables can take arguments,
      //   // in which case the syntax is "VAR_NAME:{SOME_OTHER_VAR(arg1, arg2, ...argn)}
      //   type: Sequelize.JSON
      // },
      ispublic: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      }
    });
  
    return Card;
  };
  
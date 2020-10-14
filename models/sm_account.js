// SM_Account Model -- Social Media Accounts
// This model will store the screen_names that users 
// type into the main input field on the homepage.

module.exports = function(sequelize, DataTypes) {
    var SM_Account = sequelize.define("SM_Account", {
      screen_name: DataTypes.STRING,
      score: DataTypes.INTEGER
    });
    return SM_Account;
  };
  
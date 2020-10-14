module.exports = function(sequelize, DataTypes) {
    var Account = sequelize.define("Account", {
      screen_name: DataTypes.STRING,
      score: DataTypes.INTEGER
    });
    return Account;
  };
  
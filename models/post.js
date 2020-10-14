// SM_Account Model -- Social Media Accounts
// This model will store the screen_names that users 
// type into the main input field on the homepage.

module.exports = function(sequelize, DataTypes) {
    var Post = sequelize.define("Post", {
      id: { type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true},
      curator_id: DataTypes.INTEGER,
      keyword: DataTypes.STRING,
      bias: DataTypes.STRING,
      text: DataTypes.TEXT,
      image: DataTypes.STRING,
      likes: DataTypes.INTEGER,
      comments: DataTypes.INTEGER,
      url: DataTypes.TEXT,
      thumbnail: DataTypes.TEXT,
      has_media: DataTypes.BOOLEAN,
      user_image: DataTypes.STRING,
      user_screen_name: DataTypes.STRING,
      network_name: DataTypes.STRING,
      user_url: DataTypes.STRING,
    });
    return Post;
  };
  
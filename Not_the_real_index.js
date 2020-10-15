// this is going to require express 
var express = require("express");
var exphbs = require("express-handlebars");

// this sets up the express port .. i chose port # 8080
var app = express();
var PORT = process.env.PORT || 8080;

// still working on this .. this needs to be redirected to a folder 
// the folder needs to have .js files in it
var db = require("./models");

// this sets up the express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set Handlebars as the default templating engine.
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// static directory 
app.use(express.static("public"));

// requiring routes .. this is tbd because there are no routes.js files yet 
// require("./** folder name ** / ** file name ** )(app); // facebook
// require("./** folder name ** / ** file name ** )(app); // google
// require("./** folder name ** / ** files name **)(app); // twitter
require("./routes/html-routes")(app);

// syncing the sequelize models and then starting the express app
db.sequelize.sync({ force: true }).then(function() {

  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });

});

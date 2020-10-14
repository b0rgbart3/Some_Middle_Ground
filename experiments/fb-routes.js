//Jen work in progress
//npm install fb
//
//add to server.js: 
//var FB = require('../../fb'),
// if(!config.facebook.appId || !config.facebook.appSecret) {
//   throw new Error('facebook appId and appSecret required in config.js');
// }
//
//add to server.js OR separate config.js
// config.facebook = {
//   appId:          process.env.FACEBOOK_APPID          || '130243393813697',
//   appSecret:      process.env.FACEBOOK_APPSECRET      || 'c82696768ae4ad8b63db874cb64eb558',
//   appNamespace:   process.env.FACEBOOK_APPNAMESPACE   || 'nodescrumptious',
//   redirectUri:    process.env.FACEBOOK_REDIRECTURI    ||  config.rootUrl + 'login/callback'
// };

//if separate config.js file, need to export
// module.exports = config;
// and require in server.js
// var fbconfig = require("config.js")

// const API_KEY;
const user_id = "me/";
const accessToken = "EAAK7e3FZAqWIBAGgUkxuPxNwq945NxAnQPXTBh9YPZB2UQHIzkgVE1EYPRBVxS76ATfGnRjsl7CIScWGcXQwIScg3FVq8esTwVJqUmcGAZAWHyIBC6F4qFiQeeLY9vj3ggAJPAgol3WLsmBzrZCo9mBoZBEhIbEBSgc0a793htPul3VJO1hZBEqB2M2ZBPHbAVhIlTnmZB203K9Y1xkTmqhLZBKQT3UgW9vXCs51hWmmsMAZDZD";
const endPtURL = "https://graph.facebook.com/";
const params = "feed/";
const URL = "https://graph.facebook.com/me/feed/"
let feed = [];

function getUserFeed (URL) {
axios.get(URL)
  .then(response => {
    console.log(response.data.url);
    console.log(response.data.explanation);
  })
  .catch(error => {
    console.log(error);
  });
}

getUserFeed(URL)

//========================================================================================

// FB.api(
//     '/me/feed',
//     'GET',
//     {},
//     function(response) {
//         // Insert your code here
//     }
//   );



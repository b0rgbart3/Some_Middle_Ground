var express = require("express");

var router = express.Router();
var db = require("../models");
const Stream = require("../classes/streamClass");



// Sort all of the post text and then count which words are used most often

function cleanString(stringArgument) {
    return stringArgument.replace(/[^\w\s]/gi, '');
  }



  function noNumeric(value) {
    return value.replace(/\d[^abc]/g, '');
  }
  
  function findRecentTopics(blue,red) {
    var bluePostText = "";
    var redPostText = "";
    var blueObject;
  
    blue.forEach( post=> {
      var clean = cleanString(post.text.replace("\n", " ")).replace("'","").toLowerCase();
      bluePostText += clean.replace("\n", " ").trim();
    
    })
  
    var blueWords = noNumeric(bluePostText).split(" ");
    var redWords = noNumeric(redPostText).split(" ");
    var blueObject= convertToObject(blueWords);
    var blueArray = removeSmallCounts(blueObject);
    var redObject = convertToObject(redWords);
    var redArray = removeSmallCounts(redObject);
  
    return { blue: blueArray, red: redArray };
  
  }
  
  // remove small # of counted words from the collection
  function removeSmallCounts(largeObject) {
    newArray = [];
  
  for (keys in largeObject) {
    for (var nestedKey in largeObject[keys]) {
       if (keys.length > 2 ) {
          if (largeObject[keys][nestedKey] > 3 ) {
                newArray.push( [ keys, largeObject[keys][nestedKey]]);
              }
        }
    }
  }
    return newArray;   
  }
  
  function convertToObject(wordArray) {
    var wordObject = {};
    
    wordArray.forEach( wordString => {
      
        if ( wordObject[wordString] ) {
          wordObject[wordString].count =  wordObject[wordString].count + 1;
        }
        else {
          wordObject[wordString] = { count: 1 };
        }
      
    });
    return wordObject;
  }
  
  function findTop5(wordObject) {
  
    // Find the highest # of repeats 
    var highestCount = 0;
    var highestWords = [];
    wordObject.forEach( word => {
      if (word.count > highestCount) {
        highestCount = word.count;
        highestWords[0] = word;
      }
    });
  }

  

// Import the models to use its database functions.
module.exports = function(app) {
    // Create all our routes and set up logic within those routes where required.


    app.get("/api/word-cloud-data", function(req,res) {
         // Create a new Curator Stream Object
         var stream = new Stream();
         var blueFeed, redFeed;
 
                // Get the Blue Feed from the stream
                stream.getBlueFeed( async function(bluedata) {
                  blueFeed = bluedata;
                 // console.log("BlueCount: " + blueFeed.length);
      
                  // When the blue feed has returned to us, then get the Red Feed
                  stream.getRedFeed( function(reddata) {
                      redFeed = reddata;

                      var wordCloud = findRecentTopics(bluedata,reddata);
                      // console.log(res.json(wordCloud));
                      res.json(wordCloud);  // returns an object with nested arrays for the wordcloud 
                  });
                });


    });
    
    app.post("/api/analyze_keyword", function(req, res) {
        var keyword = req.body.keyword;
        console.log('keyword: ' + keyword);

        // Create a new Curator Stream Object
        var stream = new Stream(keyword);
        var blueFeed, redFeed;

       

        // Get the Blue Feed from the stream
        stream.getBlueFeed( async function(bluedata) {
            blueFeed = bluedata;
            console.log("BlueCount: " + blueFeed.length);

            // When the blue feed has returned to us, then get the Red Feed
            stream.getRedFeed( function(reddata) {
                redFeed = reddata;
                console.log("RedCount: " + redFeed.length);
            
                // Now that we have both the blue and the red feeds - we can store them 
                // as posts in our DB
                blueFeed.forEach( async function(postItem) {

                    var newPost = {
                        curator_id: postItem.id,
                        keyword: keyword,
                        bias: "blue",
                        text: postItem.text,
                        image: postItem.image,
                        likes: postItem.likes,
                        comments: postItem.comments,
                        url: postItem.url,
                        thumbnail: postItem.thumbnail,
                        has_media: postItem.has_media,
                        user_image: postItem.user_image,
                        user_screen_name: postItem.user_screen_name,
                        network_name: postItem.network_name,
                        user_url: postItem.user_url

                    };

                   await db.Post.create(newPost);
                   
          
                 });

                 redFeed.forEach( async function(postItem) {

                    var newPost = {
                        curator_id: postItem.id,
                        keyword: keyword,
                        bias: "red",
                        text: postItem.text,
                        image: postItem.image,
                        likes: postItem.likes,
                        comments: postItem.comments,
                        url: postItem.url,
                        thumbnail: postItem.thumbnail,
                        has_media: postItem.has_media,
                        user_image: postItem.user_image,
                        user_screen_name: postItem.user_screen_name,
                        network_name: postItem.network_name,
                        user_url: postItem.user_url

                    };

                   await db.Post.create(newPost);
                   
          
                 });

                res.json( {});
    
               
            })
        })
       

        

        



    });
};


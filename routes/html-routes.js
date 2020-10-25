var express = require("express");
var googleQuery = require ('./google-api.js');
var db = require("../models");
const Stream = require("../classes/streamClass");
var path = require("path");
var fs = require('fs');

// function getOutletStats(blue,red) {

//   blueStats = [];
//   redStats = [];
//   blue.forEach( post => {
//     blueStats.push(post.user_screen_name);
//   });
//   red.forEach( post => {
//     redStats.push(post.user_screen_name);
//   });
//   var statObject = {blue:blueStats, red:redStats}
//   return statObject;

// }

module.exports = function(app) {


  // Load the trimmed article data from our DB

    app.get("/results", function(req, res) {
       
      // console.log("Request.params: " + JSON.stringify(req.query) );
        var keyword = req.query.keyword;
        var bluePosts = [];

        console.log("Pulling from the database:");
        db.Post.findAll({
          where: {
                  keyword: keyword
                }
              }).then(function(posts) {
                console.log("Got " + posts.length + " posts.");

                // Build the HandleBars Object to display the data
                var hbsObject = {
                    // blues: bluePosts,
                    // blueCount: bluePosts.length,
                    // reds: redPosts,
                    // redCount: redPosts.length,
                    keyword: keyword,
                    // outletStats:outletStats,
                    // googleInfos: googleDataReturned
                    posts: posts,
                    postCount: posts.length
                  };

                if (posts && posts.length > 0) {
                
                  // Call the Handlebar Template to display the data
                  res.render("analysis", hbsObject);
                } else {
                  res.render("error", {error: "No news posts were found for: "+keyword});
                }


              });

             
              
             
                          
    
        });
      
        // db.Post.findAll({
        //     where: {
        //       bias: 'blue',
        //       keyword: keyword
        //     }
        //   }).then(function(bluePostsReturned) {
        //     bluePosts = bluePostsReturned;


        //     db.Post.findAll( {where: {
        //         bias: 'red',
        //         keyword: keyword
        //       }}).then( function(redPostsReturned) {

        //         redPosts = redPostsReturned;

        //         googleQuery(keyword).then ( function(googleDataReturned) {


        //                 var outletStats = getOutletStats(bluePosts,redPosts);
        //                 console.log(outletStats);
        //                 console.log("Google Info: --------");
        //                 console.log(googleDataReturned);

        //                 var hbsObject = {
        //                     blues: bluePosts,
        //                     blueCount: bluePosts.length,
        //                     reds: redPosts,
        //                     redCount: redPosts.length,
        //                     keyword: keyword,
        //                     outletStats:outletStats,
        //                     googleInfos: googleDataReturned
        //                   };

        //                 // This code block notifies the user if there are no posts found on their topic

        //                 if ((bluePosts.length < 1) && (redPosts.length<1))
        //                 {
        //                   hbsObject.count = 0;
        //                   console.log("NO POSTS FOUND");

        //                   // alert("No posts found on that topic.");
                          
        //                   res.render("error", {error: "NO POSTS FOUND"});
                          

        //                 // res.json({error:"NO POSTS FOUND"});
        //                 } else {
        //                   hbsObject.count = bluePosts.length; + redPosts.length;

        //                   res.render("analysis", hbsObject);
        //                 }

                          
        //         }).catch(e => {
        //           console.error(e);
        //           throw e;
        //         });;
        //     });
        //   });  
   

    app.get("/stats", function(req, res) {
  
      res.sendFile(path.join(__dirname, "/../public/data-vis.html"));
    });


    // This is the ROOT ROUTE -- which loads the handlebars template: views/index.handlebars
    app.get("/", function(req, res) {

        res.render("index");

    });
 };



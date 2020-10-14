var express = require("express");
const {google} = require('googleapis');


async function googleQuery(keyword) {
  var googleArray = [];
      // app.get("keyword_analysis",function(req,res){
      //   var keyword = req.query.keyword;
        var factchecktools = google.factchecktools('v1alpha1');
     
        // api key
        // AIzaSyAvfhWexV2bqPbvo1UNth0pJ4Tw-C479cA

      // authorizing my api 
  
        const auth = new google.auth.GoogleAuth({
          key: 'AIzaSyAvfhWexV2bqPbvo1UNth0pJ4Tw-C479cA',
          scopes: [],
        });


        // doing the magic !!
        const res = await factchecktools.claims.search({
          languageCode: 'English',
          query: keyword,
          key: 'AIzaSyAPRblVUYQKXe26yrvEXPM5u9CLjSSX9zc',
        });
        
        var googleInfo = res.data
        for (i in res.data.claims){
          googleArray.push(res.data.claims[i].claimReview[0]);
        }
        return googleArray;
      
    
    } 

    module.exports = googleQuery;
      
    

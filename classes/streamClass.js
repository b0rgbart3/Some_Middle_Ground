const axios = require('axios');

const API_Key = "7bdbfc4d-3586-4acc-a841-a018eb4c8cd9";
const endptURL = "https://api.curator.io/v1/feeds/";
const redFeedId = "f66cbd53-a9d3-40fa-a337-0b493f3e4838";
const blueFeedId = "8c5db542-fedc-4155-8125-2eda82220a84";
const midFeedId = "adb4124d-4e2b-4987-9424-e6326aab75be";
const blueFeed = [];
const redFeed = [];
var queryString;

// This is our own Stream Class -- which we will use to
// get the Curator Stream and filter it down so that it matches
// the keyword that the user is searching for.

class Stream {

    constructor(keyword) {
        if (keyword) {
        this.keyword = keyword.toLowerCase(); }
        else {
            this.keyword = "";
        }
        this.blueFeed;
        this.redFeed;
    }

    getRedFeed(cb) {
        this.redFeed = this.getCuratorFeed(redFeedId, cb);
    }
    getBlueFeed(cb) {
        this.blueFeed = this.getCuratorFeed(blueFeedId, cb);
    }
 

    keywordFilter(feed) {
        var newArray = [];
        console.log("Original feed post count: " + feed.postCount);

        if (this.keyword) {
        feed.posts.forEach(post => {
            var postText = post.text;

            if ( postText.toLowerCase().includes(this.keyword.toLowerCase()) ){
                newArray.push(post);
            } else {
                console.log("Didn't find " + this.keyword + " in: ");
                console.log(postText);
            }
        });
    
        return newArray;
        }
        else {
            console.log("no keyword on this: "+ feed.postCount);
            return feed.posts;
        }

    }

    getCuratorFeed (FeedId, cb) {
        let queryString = endptURL + FeedId + "/posts?api_key=" + API_Key+"";
        axios.get(queryString)
          .then(response => {
              switch(FeedId) {
                case redFeedId:
                    var redFeed = response.data;
                    redFeed = this.keywordFilter(redFeed);
                    this.redFeed = redFeed;
                    cb( redFeed );
                    break;
    
                case blueFeedId: 
                    var blueFeed = response.data;
                    blueFeed = this.keywordFilter(blueFeed);
                    this.blueFeed = blueFeed;
                    cb( blueFeed );
                    break;
    
                default: console.log('No Feed ID Given');
              }
          })
          .catch(error => {
            console.log(error);
          });
        }

}

module.exports = Stream;


// console.log('================BLUE FEED POSTS==================');
// getCuratorFeed(blueFeedId);
// console.log('================BLUE FEED POSTS==================');
// getCuratorFeed(redFeedId);

// exports.blueFeed = blueFeed;
// exports.redFeed = redFeed;

//IMPORT FROM JSON TO TABLE==============================================================================


// > util.importJson("/path_to_file/zips.json", {schema: "test", collection: "zips_collection"});
// > util.importJson("/path_to_file/zips.json", {schema: "test", table: "zips_table"});


//API INFO==============================================================================

// API Docs at https://curator.io/docs/api/
// sample request: GET https://api.curator.io/v1/feeds/FEED_ID/posts?api_key=ABCD-1234

// Required Param
// Param	Description
// FEED_ID	Feed API Key or Feed Public Key

// Optional Params
// Param	Description
// limit	Limits the number of posts returned - defaults to 25, max is 100
// offset	Page offset - used to paginate through the results
// network_id	Filter by a specific Network ID
// source_type	Filter by a specific Source Type ID
// status	Filter by specific Post status - 1=all active posts, 0=all disabled posts, all = all posts
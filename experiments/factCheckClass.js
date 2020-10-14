// requiring google api 
// requiring factchecktools 
const {google} = require('googleapis');
const factchecktools = google.factchecktools('v1alpha1');
class GStream {

    constructor() {
        this.gFeed;
    }

        // api key
        // AIzaSyAvfhWexV2bqPbvo1UNth0pJ4Tw-C479cA

      // authorizing my api 
      async getGStream(keyword) {
        this.keyword = keyword.toLowerCase();

        const auth = new google.auth.GoogleAuth({
          key: 'AIzaSyAvfhWexV2bqPbvo1UNth0pJ4Tw-C479cA',
          scopes: [],
        });


        // doing the magic !!
        this.gFeed = await factchecktools.claims.search({
          languageCode: 'English',
          query: 'the world is flat',
          key: 'AIzaSyAvfhWexV2bqPbvo1UNth0pJ4Tw-C479cA',
        }).catch(e => {
            console.error(e);
            throw e;
          });;
        //console.log(res.data);

        return this.gFeed;
      }
    }
  
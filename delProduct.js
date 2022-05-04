var express = require("express");
var cheerio = require("cheerio");
var router = express.Router();
var request = require("request-promise");
var MongoClient = require("mongodb").MongoClient;
var mongodb = require("mongodb");
var ObjectID = require('mongodb').ObjectID;

var url =
  "mongodb+srv://admin:admin@producttracking.7oyuk.mongodb.net/admin1?retryWrites=true&w=majority";

router.post("/", function (req, res) {
  console.log(req.body);
  var U1 = req.body._id;
  console.log("IN del PRODUCT");

  MongoClient.connect(
    url,
    { useNewUrlParser: true, useUnifiedTopology: true },
    async function (err, db) {
      if (err) throw err;
      var dbo = db.db("admin1");
      var myobj =  {_id: new mongodb.ObjectID(U1)}
      console.log(myobj);
      var result = await dbo.collection("maincollection").deleteOne(myobj);
      if (result.deletedCount === 1) {
        console.log("Successfully deleted one document.");
      } else {
        console.log("No documents matched the query. Deleted 0 documents.");
      }
    }
  );
});
module.exports = router;

var express = require("express");
var cheerio = require("cheerio");
var router = express.Router();
var request = require("request-promise");
const res = require("express/lib/response");
var MongoClient = require("mongodb").MongoClient;
var url =
  "mongodb+srv://admin:admin@producttracking.7oyuk.mongodb.net/admin1?retryWrites=true&w=majority";

router.post("/", function (req, response) {
  console.log("JUST NOW ENTERED INTO LOGIN CHECKING");
  console.log(req.body);
  var U1 = req.body.username;
  var P1 = req.body.password;
  // console.log(U1)
  // console.log(P1);
  console.log("IN LOGIN GET");
  MongoClient.connect(
    url,
    { useNewUrlParser: true, useUnifiedTopology: true },
    async function (err, db) {
      if (err) throw err;
      var dbo = db.db("admin1");
      var myobj = { username: U1, password: P1 };
      console.log("IN LOGIN DB CONNECTED");
      const result=await dbo.collection("users").findOne(myobj);
      var status=true;
      if(result){
          console.log("FOUND");
      }
      else{
          console.log('NOT FOUND');
          status=false;
      }
      response.send({success:status});
    }
  );
});
module.exports = router;

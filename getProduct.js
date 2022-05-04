var express = require('express');
var cheerio = require("cheerio");
var router = express.Router();
var request= require("request-promise");
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://admin:admin@producttracking.7oyuk.mongodb.net/admin1?retryWrites=true&w=majority";



router.post('/',function(req, res) {
    console.log(req.body);
    var U1=req.body.username;
    console.log("IN get PRODUCT")

    MongoClient.connect(url, { useNewUrlParser: true ,useUnifiedTopology: true},async function(err, db) {
        if (err) throw err;
        var dbo = db.db("admin1");
        var myobj={ username:U1};
        console.log(myobj)
        dbo.collection("maincollection").find(myobj).toArray(function(err, result) {
            if (err) throw err;
            // if(result.mail==U1)
            
            console.log(result);
            db.close();
            res.send(result);
          });
        
      });


});
module.exports = router;

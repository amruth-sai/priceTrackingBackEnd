var express = require('express');
var cheerio = require("cheerio");
var router = express.Router();
var request= require("request-promise");
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://admin:admin@producttracking.7oyuk.mongodb.net/admin1?retryWrites=true&w=majority";



router.post('/',function(req, res) {
    var U1=req.body.username;
    var P1=req.body.password;
    var M1=req.body.email;
    console.log(U1)
    console.log(P1);
    console.log(M1);

    console.log("IN SignUP");
    MongoClient.connect(url, { useNewUrlParser: true ,useUnifiedTopology: true},async function(err, db) {
        if (err) throw err;
        var dbo = db.db("admin1");
        var myobj={ username :U1,password:P1,mail:M1};
        console.log('IN SIGNUP DB CONNECTED');
        var result=await dbo.collection("users").insertOne(myobj);
        var C123=true;
        if(result){
            console.log("CREATION DONE");
        }
        else{
            C123=false
            console.log("CREATION NOT DONE");
        }
        res.send({success:C123})
    });
    

});
module.exports = router;

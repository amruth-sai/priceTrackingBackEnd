var express = require("express");
var cheerio = require("cheerio");
var router = express.Router();
var request = require("request-promise");
var MongoClient = require("mongodb").MongoClient;
var url =
  "mongodb+srv://admin:admin@producttracking.7oyuk.mongodb.net/admin1?retryWrites=true&w=majority";

router.post("/", function (req, res) {
  console.log(req.body);
  var link1 = req.body.link;
  var username = req.body.username;
  var cost;
  var iLink;
  console.log(link1, username);
  request(link1, (err, res, html) => {
    // console.log(html);
    var $ = cheerio.load(html);
    console.log("Here");
    cost = $(".apexPriceToPay").text().split("₹")[1]; //PriceToPay
    iLink = $("#imgTagWrapperId").children().first()["0"]["attribs"]["src"];
    var name = $("#productTitle").text() //PriceToPay
    console.log(cost.split("₹")[1]);
    console.log(iLink);

    MongoClient.connect(
      url,
      { useNewUrlParser: true, useUnifiedTopology: true },
      async function (err, db) {
        if (err) throw err;
        var dbo = db.db("admin1");
        const result=await dbo.collection("users").findOne({username: username});

        var myobj = { link: link1, price: cost, mail: result["mail"], imgLink: iLink,username: username,name:name};

        console.log(cost);
        dbo.collection("maincollection").insertOne(myobj, (err, res) => {
          if (err) throw err;
          console.log("INSERTED");
          db.close();
        });
      }
    );
  });
  // res.redirect('/');
});
module.exports = router;

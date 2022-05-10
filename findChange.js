var request = require("request");
var cheerio = require("cheerio");
var nodemailer = require("nodemailer");

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "cvrita2018@gmail.com",
    pass: "",
  },
});

var MongoClient = require("mongodb").MongoClient;
var url =
  "mongodb+srv://admin:admin@producttracking.7oyuk.mongodb.net/admin1?retryWrites=true&w=majority";
var name = "";
var cost = "";
MongoClient.connect(
  url,
  { useNewUrlParser: true, useUnifiedTopology: true },
  async function (err, db) {
    if (err) throw err;
    var dbo = db.db("admin1");

    var cursor = await dbo.collection("maincollection").find();

    cursor.each(async function (err, item) {
      if (item == null) {
        db.close();
        return;
      }
      console.log(item);
      // console.log("nbhkbvdsbj")
      var temp = item.link;
      var price = item.price;
      console.log(temp, price);
      await check(temp,price);
      
    });
  }
);
async function check(temp, price) {
  console.log("Here");
  request(temp, (err, res, html) => {
    console.log(html);
    var $ = cheerio.load(html);
    console.log("Here");
    var name = "";

    cost = $(".apexPriceToPay").text().split("₹")[1]; //PriceToPay
    // iLink = $("#imgTagWrapperId").children().first()["0"]["attribs"]["src"];
    name = $("#productTitle").text(); //PriceToPay

    console.log(cost.split("₹")[1]);
    console.log(iLink);
    if (cost.split("₹")[1] !== price) {
      var mailOptions = {
        from: "cvrita2018@gmail.com",
        to: item.mail,
        subject: "PRICE DROP ALERT",
        text: "Hurry! price drop on " + item.link,
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });
      return;
    }
  });
}

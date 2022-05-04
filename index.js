const express = require('express');
const path = require('path');
const cors = require("cors")
// import cors from 'cors';

const app = express();

app.use(express.urlencoded({
  extended: true
}));
app.use(express.json());
app.use(cors());


var addProduct = require('./addProduct');
var unSubscribe = require('./unSubscribe');
var login = require('./login');
var signup =require('./signup');
var getProduct =require('./getProduct');
var delProduct =require('./delProduct');

app.use('/delProduct',delProduct);
app.use('/getProduct',getProduct);
app.use('/signup',signup);
app.use('/login',login);
app.use('/addProduct',addProduct);

app.use('/unSubscribe',unSubscribe);
app.get('/', (req, res) => {
  res.sendFile(__dirname+"/"+"index.html");
  
});

app.listen(8000, () => {
  console.log("Example app listening at http://localhost:8000")
});
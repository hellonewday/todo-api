var express = require("express");
var cors = require("cors");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var app = express();
var listRoute = require("./routes/lists");

mongoose.connect(
  "mongodb+srv://quochung5c:quochung5c@cluster0-4veva.gcp.mongodb.net/todo?retryWrites=true",
  {
    useNewUrlParser: true
  },
  () => {
    console.log("Connect to database");
  }
);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use("/uploads", express.static("uploads"));

app.use("/", express.static(__dirname));

app.use("/lists", listRoute);

module.exports = app;

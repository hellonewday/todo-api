var express = require("express");
var cors = require("cors");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var app = express();
var listRoute = require("./routes/lists");
var commentRoute = require("./routes/comments");


mongoose.connect(
  "mongodb+srv://quochung5c:quochung5c@cluster0-4veva.gcp.mongodb.net/todo?retryWrites=true",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  },
  () => {
    console.log("Connect to database");
  }
);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use("/", express.static(__dirname));

app.use("/lists", listRoute);
app.use('/comments',commentRoute)

module.exports = app;
